import { useState, useEffect, useCallback } from 'react';
import { TimerSettings, TimerState, TimerStatus } from '../types';

export function useTimer(settings: TimerSettings) {
  const [status, setStatus] = useState<TimerStatus>({
    currentSession: 1,
    timeRemaining: settings.focusTime * 60,
    timerState: 'focus',
    isPaused: true,
    countdownToStart: 5
  });

  const getNextState = useCallback((): TimerState => {
    if (status.timerState === 'focus') {
      if (status.currentSession % settings.longBreakAfter === 0) {
        return 'longBreak';
      }
      return 'shortBreak';
    }
    return 'focus';
  }, [status.timerState, status.currentSession, settings.longBreakAfter]);

  const getTimeForState = useCallback((state: TimerState): number => {
    switch (state) {
      case 'focus':
        return settings.focusTime * 60;
      case 'shortBreak':
        return settings.shortBreakTime * 60;
      case 'longBreak':
        return settings.longBreakTime * 60;
    }
  }, [settings]);

  const togglePause = useCallback(() => {
    if (status.countdownToStart === 0) {
      setStatus(prev => ({
        ...prev,
        isPaused: !prev.isPaused
      }));
    }
  }, [status.countdownToStart]);

  // Handle spacebar press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePause]);

  // Handle countdown and timer
  useEffect(() => {
    let timer: number;

    if (status.countdownToStart > 0) {
      timer = window.setInterval(() => {
        setStatus(prev => ({
          ...prev,
          countdownToStart: prev.countdownToStart - 1,
          isPaused: prev.countdownToStart > 1 // Start playing when countdown reaches 0
        }));
      }, 1000);
    } else if (!status.isPaused) {
      timer = window.setInterval(() => {
        setStatus(prev => {
          if (prev.timeRemaining <= 0) {
            const nextState = getNextState();
            const nextSession = nextState === 'focus' ? prev.currentSession + 1 : prev.currentSession;
            
            if (nextSession > settings.totalSessions) {
              return { ...prev, isPaused: true };
            }

            return {
              ...prev,
              currentSession: nextSession,
              timerState: nextState,
              timeRemaining: getTimeForState(nextState)
            };
          }

          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1
          };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [settings, getNextState, getTimeForState, status.isPaused, status.countdownToStart]);

  return { ...status, togglePause };
}