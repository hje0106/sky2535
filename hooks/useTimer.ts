
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TimerStatus } from '../types';

export const useTimer = (initialTotalSeconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);

  const intervalRef = useRef<number | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearTimerInterval();
            setStatus(TimerStatus.FINISHED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimerInterval();
    }

    return clearTimerInterval;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const start = useCallback((totalSeconds: number) => {
    setSecondsLeft(totalSeconds);
    setStatus(TimerStatus.RUNNING);
  }, []);

  const pause = useCallback(() => {
    if (status === TimerStatus.RUNNING) {
      setStatus(TimerStatus.PAUSED);
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === TimerStatus.PAUSED) {
      setStatus(TimerStatus.RUNNING);
    }
  }, [status]);

  const reset = useCallback(() => {
    clearTimerInterval();
    setStatus(TimerStatus.IDLE);
    setSecondsLeft(0);
  }, [clearTimerInterval]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [secondsLeft]);

  const backgroundColor = useMemo(() => {
    if (status === TimerStatus.IDLE) {
      return 'bg-slate-900';
    }
    if (status === TimerStatus.FINISHED) {
      return 'bg-red-800';
    }

    // Use initialTotalSeconds for a stable percentage calculation
    const percentageLeft = initialTotalSeconds > 0 ? (secondsLeft / initialTotalSeconds) * 100 : 0;
    
    if (percentageLeft > 50) {
      return 'bg-sky-700'; // Calming blue for the initial phase
    }
    if (percentageLeft > 20) {
      return 'bg-amber-500'; // Warm amber for the warning phase
    }
    return 'bg-red-700'; // Deep red for the final phase
  }, [status, secondsLeft, initialTotalSeconds]);

  return { status, secondsLeft, formattedTime, backgroundColor, start, pause, resume, reset };
};
