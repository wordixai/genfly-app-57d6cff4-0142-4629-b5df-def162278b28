import { useEffect, useRef } from 'react';
import { useMeditationStore } from '@/stores/meditationStore';

export const useTimer = () => {
  const intervalRef = useRef<number>();
  const { timer, updateTimeLeft, resetTimer } = useMeditationStore();
  
  useEffect(() => {
    if (timer.isActive && !timer.isPaused) {
      intervalRef.current = setInterval(() => {
        const newTimeLeft = timer.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          updateTimeLeft(0);
          resetTimer();
          // Could add completion sound or notification here
        } else {
          updateTimeLeft(newTimeLeft);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isActive, timer.isPaused, timer.timeLeft, updateTimeLeft, resetTimer]);
  
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const getProgress = () => {
    if (timer.totalTime === 0) return 0;
    return ((timer.totalTime - timer.timeLeft) / timer.totalTime) * 100;
  };
  
  return {
    formatTime,
    getProgress,
  };
};