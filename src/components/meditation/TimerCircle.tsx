import { useMeditationStore } from '@/stores/meditationStore';
import { useTimer } from '@/hooks/useTimer';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TimerCircle = () => {
  const { timer, startTimer, pauseTimer, resetTimer } = useMeditationStore();
  const { formatTime, getProgress } = useTimer();
  
  const progress = getProgress();
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const handlePlayPause = () => {
    if (!timer.isActive) {
      startTimer();
    } else {
      pauseTimer();
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div className="meditation-circle relative">
          {/* Progress Ring */}
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90 transform"
            viewBox="0 0 256 256"
          >
            {/* Background Circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="4"
            />
            {/* Progress Circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          
          {/* Timer Display */}
          <div className="flex flex-col items-center justify-center text-white">
            <div className="text-4xl font-light tracking-wider mb-2">
              {formatTime(timer.timeLeft)}
            </div>
            <div className="text-sm opacity-75">
              {timer.isActive ? (timer.isPaused ? 'Paused' : 'Meditating') : 'Ready'}
            </div>
          </div>
        </div>
        
        {/* Breathing Guide Ring */}
        {timer.isActive && !timer.isPaused && (
          <div className="absolute inset-4 breathing-guide animate-breathe opacity-40" />
        )}
      </div>
      
      {/* Controls */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={handlePlayPause}
          className="zen-button w-16 h-16 rounded-full p-0"
        >
          {timer.isActive && !timer.isPaused ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          className="zen-button-secondary w-12 h-12 rounded-full p-0"
        >
          <Square className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};