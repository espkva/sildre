import { useEffect, useState } from "react";

export const useTimer = (active: boolean) => {
  const [isRunning, setIsRunning] = useState(active);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setIsRunning(active);
  }, [active]);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;
    const delay = 1000;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + delay);
      }, delay);
    } else if (!isRunning) {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    time,
    minutes: Math.floor((time / 60000) % 60)
      .toString()
      .padStart(2, "0"),
    seconds: Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0"),
  };
};
