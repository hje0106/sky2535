
import React from 'react';
import { TimerStatus } from '../types';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  status: TimerStatus;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 w-40 py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
);

export const Controls: React.FC<ControlsProps> = ({ status, onPause, onResume, onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
      {status === TimerStatus.RUNNING && (
        <ControlButton onClick={onPause} className="bg-white/20 hover:bg-white/30 text-white focus:ring-white/50">
          <Pause size={22} />
          일시정지
        </ControlButton>
      )}
      {status === TimerStatus.PAUSED && (
        <ControlButton onClick={onResume} className="bg-white/20 hover:bg-white/30 text-white focus:ring-white/50">
          <Play size={22} />
          계속
        </ControlButton>
      )}
      {(status !== TimerStatus.IDLE) && (
        <ControlButton onClick={onReset} className="bg-transparent border-2 border-white/50 hover:bg-white/10 text-white/80 hover:text-white focus:ring-white/50">
          <RotateCcw size={22} />
          초기화
        </ControlButton>
      )}
    </div>
  );
};
