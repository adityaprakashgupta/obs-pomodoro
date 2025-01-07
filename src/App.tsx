import React from 'react';
import { Timer, TimerOff, Play, Pause, TimerReset } from 'lucide-react';
import { useTimer } from './hooks/useTimer';
import { formatTime } from './utils/formatTime';
import { TimerSettings } from './types';

function useQueryParams(): TimerSettings & { showPauseButton?: boolean } {
  const params = new URLSearchParams(window.location.search);
  return {
    focusTime: Number(params.get('focusTime')) || 25,
    shortBreakTime: Number(params.get('shortBreakTime')) || 5,
    longBreakTime: Number(params.get('longBreakTime')) || 15,
    totalSessions: Number(params.get('totalSessions')) || 4,
    longBreakAfter: Number(params.get('longBreakAfter')) || 4,
    showPauseButton: params.get('showPauseButton') !== 'false'
  };
}

function App() {
  const { showPauseButton, ...settings } = useQueryParams();
  const status = useTimer(settings);

  const stateColors = {
    focus: 'text-emerald-500',
    shortBreak: 'text-sky-500',
    longBreak: 'text-violet-500'
  };

  const stateLabels = {
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break'
  };

  if (status.countdownToStart > 0) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-800">
          <div className="text-6xl font-bold text-white">
            Starting in {status.countdownToStart}...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-800 flex items-center gap-6">
        <div className="flex items-center gap-3">
          {status.isPaused ? (
            <TimerOff className={`w-8 h-8 ${stateColors[status.timerState]}`} />
          ) : status.timerState === 'focus' ? (
            <Timer className={`w-8 h-8 ${stateColors[status.timerState]}`} />
          ) : (
            <TimerReset className={`w-8 h-8 ${stateColors[status.timerState]}`} />
          )}
          <div>
            <h2 className={`text-4xl font-bold font-mono ${stateColors[status.timerState]}`}>
              {formatTime(status.timeRemaining)}
            </h2>
            <p className="text-gray-400 text-sm">{stateLabels[status.timerState]}</p>
          </div>
        </div>
        
        {showPauseButton && (
          <button 
            onClick={status.togglePause}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label={status.isPaused ? 'Play' : 'Pause'}
          >
            {status.isPaused ? (
              <Play className="w-6 h-6 text-gray-400" />
            ) : (
              <Pause className="w-6 h-6 text-gray-400" />
            )}
          </button>
        )}

        <div className="border-l border-gray-700 pl-6 flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-300">
            {status.currentSession}
          </span>
          <span className="text-gray-500 text-2xl">/</span>
          <span className="text-gray-400 text-2xl">
            {settings.totalSessions}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
