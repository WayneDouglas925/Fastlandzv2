
export type FastingStatus = 'IDLE' | 'FASTING' | 'EATING' | 'COMPLETED';

export interface MissionProtocol {
  id: string;
  label: string;
  desc: string;
}

export interface DailyLog {
  hunger: number;
  mood: string;
  meals: string;
  lessons: string;
  timestamp: string;
}

export interface UserProfile {
  warriorName: string;
  characterType: 'male' | 'female' | 'neutral';
  currentDay: number;
  xp: number;
  level: number;
  hasOnboarded: boolean;
  streak: number;
  completedHabits: string[]; 
  completedObjectives: string[]; 
  waterRations: number; 
  dailyLogs: Record<string, DailyLog>; 
}

export interface DayConfig {
  dayNumber: number;
  title: string;
  subtitle: string;
  fastDuration: number;
  habit: string;
  habitDescription: string;
  habitScience: string;
  intelTitle: string;
  intelContent: string;
  physiologicalEffect: string;
  objective: string;
  bonusTip: string;
  protocols: MissionProtocol[];
  survivalAdvice: string;
}

export interface FastSession {
  id: string;
  startTime: string; 
  targetEndTime: string; 
  actualEndTime?: string; 
  status: FastingStatus;
  dayNumber: number;
  notes?: string;
  hungerLevel?: number;
}
