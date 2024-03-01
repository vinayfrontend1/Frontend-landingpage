import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const formatTwoDigits = (number: number): string => (number < 10 ? `0${number}` : `${number}`);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        completed: false,
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        completed: true,
      };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex">
      {/* Days */}
      <div className="countdown-box">
        <div className="countdown-value">{formatTwoDigits(timeLeft.days)}</div>
        <div className="countdown-label">Days</div>
      </div>

      {/* Hours */}
      <div className="countdown-box">
        <div className="countdown-value">{formatTwoDigits(timeLeft.hours)}</div>
        <div className="countdown-label">Hours</div>
      </div>

      {/* Minutes */}
      <div className="countdown-box">
        <div className="countdown-value">{formatTwoDigits(timeLeft.minutes)}</div>
        <div className="countdown-label">Minutes</div>
      </div>

      {/* Seconds */}
      <div className="countdown-box">
        <div className="countdown-value">{formatTwoDigits(timeLeft.seconds)}</div>
        <div className="countdown-label">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
