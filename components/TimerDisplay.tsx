
import React from 'react';
import { TimerStatus } from '../types';

interface TimerDisplayProps {
  time: string;
  status: TimerStatus;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, status }) => {
  const message = status === TimerStatus.FINISHED ? "시간 종료!" : "남은 시간";

  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/80 tracking-wider uppercase">
        {message}
      </h2>
      <div className="text-8xl sm:text-9xl font-bold font-mono text-white tracking-tighter" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {time}
      </div>
    </div>
  );
};
