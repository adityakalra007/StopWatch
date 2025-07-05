import { useEffect, useRef, useState } from "react";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const[laps,setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
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
    setLaps([]);
  };

    const lap = () =>{
      setLaps((prev)=>[...prev,time]);

    }
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

   const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0"); // 2 digits
    return `${minutes}:${seconds}:${milliseconds}`;
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
           <button
            onClick={lap}
            className="px-6 py-2 text-white backdrop-blur-md bg-orange-500 border-orange-600 rounded-xl cursor-pointer hover:bg-orange-800 transition"
          >
            Lap
          </button>

        </div>
        {
              laps.length>0 && (
                <div className="mt-6 text-left max-h-60 overflow-auto h-60">
                  <h2 className="text-white text-lg font-semibold mb-2">Laps: </h2>
                  <ul className="space-y-1 text-white font-mono">
                    {
                      laps.map((lap,index) =>{
                        return(

                        
                        <li key={index}>
                          Lap {index+1} : <span className="text-white/80">{formatTime(lap)}</span>
                        </li>
                        )  
                    })
                    }
                  </ul>
                </div>  
              )}
            

       
      </div>
    </div>
  );
};
