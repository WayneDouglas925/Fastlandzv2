import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleClearData = () => {
    if (confirm('⚠️ This will delete all your progress. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050a05] text-white flex items-center justify-center p-6 font-mono">
          <div className="max-w-2xl w-full space-y-8">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-black italic uppercase tracking-tighter text-red-500 neon-glow">
                SYSTEM FAILURE
              </h1>
              <p className="text-xl font-mono text-slate-400 uppercase tracking-widest">
                Critical Error Detected
              </p>
            </div>

            {/* Error Details */}
            <div className="bg-black/40 border border-red-500/30 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <h3 className="text-sm font-black uppercase tracking-widest text-red-500">Error Log</h3>
              </div>
              <div className="bg-black/60 p-4 rounded-xl border border-red-900/20">
                <p className="text-xs text-red-400 font-mono break-all">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
              </div>
              {this.state.error?.stack && (
                <details className="text-xs text-slate-600 font-mono">
                  <summary className="cursor-pointer hover:text-slate-400 transition-colors">
                    Show Stack Trace
                  </summary>
                  <pre className="mt-2 p-4 bg-black/40 rounded-lg overflow-x-auto text-[10px] leading-relaxed">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={this.handleReset}
                className="w-full bg-green-500 hover:bg-green-400 text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-lg transition-all shadow-[0_0_40px_rgba(34,197,94,0.3)]"
              >
                Restart App
              </button>
              <button
                onClick={this.handleClearData}
                className="w-full bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all"
              >
                Clear All Data & Reset
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-slate-600 uppercase tracking-wider">
                If this error persists, try clearing your browser cache
              </p>
              <p className="text-[10px] text-slate-700 font-mono">
                Error Code: {Date.now().toString(36).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
