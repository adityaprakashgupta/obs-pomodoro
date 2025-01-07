export interface TimerSettings {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  totalSessions: number;
  longBreakAfter: number;
}

export type TimerState = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerStatus {
  currentSession: number;
  timeRemaining: number;
  timerState: TimerState;
  isPaused: boolean;
  countdownToStart: number;
}