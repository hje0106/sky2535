import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface TimeInputProps {
  onStart: (minutes: number) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ onStart }) => {
  const [minutes, setMinutes] = useState(10);
  const [error, setError] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (minutes > 0 && minutes <= 180) {
      onStart(minutes);
      setError('');
    } else {
      setError('1분에서 180분 사이의 값을 입력해주세요.');
    }
  };
  
  const quickSetTimes = [5, 10, 15, 30, 45, 60];

  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 animate-fade-in w-full max-w-2xl mx-auto">
      <header className="mb-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          시각적 발표 타이머
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl">
          발표 시간을 설정하세요.<br />남은 시간에 따라 배경색이 변해 시각적으로 알려줍니다.
        </p>
      </header>

      <form onSubmit={handleStart} className="w-full flex flex-col gap-8 items-center">
        
        <div className="relative w-full max-w-xs">
          <label htmlFor="minutes-input" className="sr-only">시간(분)</label>
          <input
            id="minutes-input"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full bg-slate-800/50 text-white text-8xl font-bold text-center appearance-none rounded-2xl py-6 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-shadow"
            min="1"
            max="180"
            required
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl text-slate-400 font-medium pointer-events-none">분</span>
        </div>
        {error && <p className="text-red-400 -mt-4 text-center">{error}</p>}
        
        <div className="flex flex-wrap justify-center gap-3">
            {quickSetTimes.map(time => (
                <button
                    key={time}
                    type="button"
                    onClick={() => setMinutes(time)}
                    className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 border-2 ${
                      minutes === time 
                      ? 'bg-indigo-500 border-indigo-500 text-white' 
                      : 'bg-transparent border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white'
                    }`}
                >
                    {time}분
                </button>
            ))}
        </div>

        <button 
          type="submit"
          className="w-full max-w-sm flex items-center justify-center gap-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-5 px-6 rounded-xl text-2xl transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50"
        >
          <Play size={28} />
          타이머 시작
        </button>

      </form>
    </div>
  );
};