import React, { useState, useEffect, useRef } from "react";
import "./style.css";
const CountdownTimer = ({
  examTitle,
  initialMinutes,
  onTimerEnd,
  examRunning,
  correct,
  total,
}) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const timerRef = useRef(null);

  useEffect(() => {
    if (examRunning && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      if (examRunning) onTimerEnd();
    }

    return () => clearInterval(timerRef.current);
  }, [examRunning, seconds, onTimerEnd]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="clock">
      <p>{examTitle}</p>
      <div className="flex">
        <p className="time">Timer: {formatTime(seconds)}</p>
        <p className="answers">
          score: {correct}/{total}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
