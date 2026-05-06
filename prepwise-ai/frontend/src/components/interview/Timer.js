import { useEffect, useState } from "react";

function Timer() {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return (

    <div className="timer-box">

      ⏱ {mins}:{secs < 10 ? `0${secs}` : secs}

    </div>
  );
}

export default Timer;