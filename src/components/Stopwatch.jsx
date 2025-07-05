import { useEffect, useRef, useState } from "react";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="h-screen w-screen p-5 flex justify-center items-center bg-black">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl w-[90%] max-w-md p-10 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white">Stop-Watch</h1>
        <p className="font-mono text-2xl font-bold text-white">
          {formatTime(time)}
        </p>
        <div className="space-x-4">
          {isRunning ? (
            <button
              onClick={stop}
              className="px-6 py-2 text-white backdrop-blur-md bg-red-500 border-red-600 rounded-xl hover:bg-red-800 cursor-pointer transition"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={start}
              className="px-6 py-2 text-white backdrop-blur-md bg-green-500 border-green-600 rounded-xl cursor-pointer hover:bg-green-800 transition"
            >
              Start
            </button>
          )}
          <button
            onClick={reset}
            className="px-6 py-2 text-white backdrop-blur-md bg-blue-500 border-blue-600 rounded-xl cursor-pointer hover:bg-blue-800 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
