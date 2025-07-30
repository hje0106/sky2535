
import React, { useState } from 'react';
import { useTimer } from './hooks/useTimer';
import { TimerStatus } from './types';
import { TimeInput } from './components/TimeInput';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';

const App: React.FC = () => {
  // totalSeconds is the source of truth for the *entire* duration
  const [totalSeconds, setTotalSeconds] = useState(0);
  const { status, formattedTime, backgroundColor, start, pause, resume, reset } = useTimer(totalSeconds);

  const handleStart = (minutes: number) => {
    if (minutes > 0) {
      const seconds = minutes * 60;
      setTotalSeconds(seconds);
      start(seconds);
    }
  };

  const handleReset = () => {
    reset();
    setTotalSeconds(0); // Reset the total duration
  };

  const isTimerActive = status !== TimerStatus.IDLE;

  return (
    <main className={`w-full h-screen flex flex-col items-center p-4 sm:p-8 transition-colors duration-1000 ${backgroundColor}`}>
      <div className="text-white text-center w-full max-w-3xl mx-auto flex flex-col justify-center flex-grow">
        {!isTimerActive ? (
          <TimeInput onStart={handleStart} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-12">
            <TimerDisplay time={formattedTime} status={status} />
            <Controls 
              status={status} 
              onPause={pause} 
              onResume={resume} 
              onReset={handleReset} 
            />
          </div>
        )}
      </div>
      <footer className="w-full text-center py-2 text-white/60 text-sm">
        © 2025 홍재은 저작권
      </footer>
    </main>
  );
};

export default App;
