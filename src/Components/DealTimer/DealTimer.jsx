import React, { useState, useEffect } from "react";
import { FaClock, FaFire, FaBolt } from "react-icons/fa";

const DealTimer = ({ endTime, title = "Flash Sale", isLive = true }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endTime ? new Date(endTime).getTime() : now + (24 * 60 * 60 * 1000); // Default 24 hours
      const difference = end - now;

      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft({ hours, minutes, seconds });
        
        // Calculate progress (assuming 24-hour deal)
        const totalDuration = 24 * 60 * 60 * 1000;
        const remaining = (difference / totalDuration) * 100;
        setProgress(Math.max(0, Math.min(100, remaining)));
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setProgress(0);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const isExpiringSoon = timeLeft.hours === 0 && timeLeft.minutes < 30;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${
      isLive ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-600' : 'bg-gradient-to-r from-gray-600 to-gray-700'
    } text-white p-6 shadow-xl animate-pulse-slow`}>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping-slow" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2 animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isLive ? (
              <>
                <FaBolt className="text-yellow-300 text-3xl animate-bounce" />
                <div>
                  <h3 className="text-2xl font-bold tracking-wide">{title}</h3>
                  <p className="text-sm opacity-90 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Live Now
                  </p>
                </div>
              </>
            ) : (
              <>
                <FaClock className="text-gray-300 text-3xl" />
                <h3 className="text-2xl font-bold opacity-60">Deal Ended</h3>
              </>
            )}
          </div>
          {isExpiringSoon && isLive && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full animate-pulse">
              <FaFire className="text-yellow-300" />
              <span className="text-sm font-semibold">Hurry!</span>
            </div>
          )}
        </div>

        {/* Timer Display */}
        {isLive && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Hours */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                <div className={`text-4xl font-bold mb-1 ${isExpiringSoon ? 'animate-pulse text-yellow-300' : ''}`}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider opacity-90">Hours</div>
              </div>

              {/* Minutes */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                <div className={`text-4xl font-bold mb-1 ${isExpiringSoon ? 'animate-pulse text-yellow-300' : ''}`}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider opacity-90">Minutes</div>
              </div>

              {/* Seconds */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                <div className={`text-4xl font-bold mb-1 ${isExpiringSoon ? 'animate-pulse text-yellow-300' : ''}`}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider opacity-90">Seconds</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  isExpiringSoon ? 'bg-yellow-300' : 'bg-white'
                } ${progress < 10 ? 'animate-pulse' : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Ending Time Text */}
            <p className="text-center text-sm mt-3 opacity-90">
              {isExpiringSoon ? '⚡ Ending soon!' : `Ends at ${endTime ? new Date(endTime).toLocaleTimeString() : 'midnight'}`}
            </p>
          </>
        )}

        {/* Deal Ended Message */}
        {!isLive && (
          <div className="text-center py-4 opacity-60">
            <p className="text-lg">This deal has ended</p>
            <p className="text-sm mt-2">Check back for new deals!</p>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      {isLive && (
        <>
          <div className="absolute top-4 right-4 text-6xl opacity-10 animate-spin-slow">
            <FaFire />
          </div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-10 animate-bounce-slow">
            <FaBolt />
          </div>
        </>
      )}
    </div>
  );
};

export default DealTimer;
