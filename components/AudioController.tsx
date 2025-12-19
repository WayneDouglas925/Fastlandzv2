
import React, { useEffect, useRef } from 'react';

interface AudioControllerProps {
  isMuted: boolean;
  isActive: boolean;
}

const AudioController: React.FC<AudioControllerProps> = ({ isMuted, isActive }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initAudio = () => {
      if (initializedRef.current || !isActive) return;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const masterGain = ctx.createGain();
      
      // Create a low "Metabolic Rumble"
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(40, ctx.currentTime);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(42, ctx.currentTime);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.Q.setValueAtTime(5, ctx.currentTime);

      // Create "Wasteland Wind" (Filtered Noise)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      
      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(400, ctx.currentTime);
      windFilter.Q.setValueAtTime(1, ctx.currentTime);

      // Slow Modulation (LFO) for the wind
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10 second cycle
      lfoGain.gain.setValueAtTime(200, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);

      // Connect everything
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      
      whiteNoise.connect(windFilter);
      windFilter.connect(masterGain);
      
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0, ctx.currentTime); // Start silent

      // Start sources
      osc1.start();
      osc2.start();
      whiteNoise.start();
      lfo.start();

      audioCtxRef.current = ctx;
      gainNodeRef.current = masterGain;
      initializedRef.current = true;
    };

    if (isActive && !initializedRef.current) {
      // Browsers often require an explicit resume on user gesture, 
      // but if called from a click handler it works.
      initAudio();
    }
  }, [isActive]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetVolume = isMuted ? 0 : 0.08; // Very subtle ambient volume
      gainNodeRef.current.gain.linearRampToValueAtTime(
        targetVolume, 
        audioCtxRef.current.currentTime + 1.5
      );
      
      if (audioCtxRef.current.state === 'suspended' && !isMuted) {
        audioCtxRef.current.resume();
      }
    }
  }, [isMuted]);

  return null; // Headless component
};

export default AudioController;
