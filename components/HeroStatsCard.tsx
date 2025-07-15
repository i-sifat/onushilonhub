import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Typewriter } from 'react-simple-typewriter';
import { FaQuestionCircle, FaChartLine, FaBookOpen } from 'react-icons/fa';

export default function HeroStatsCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const motivationalTexts = [
    "Learn faster and smarter.",
    "Master grammar like a pro.",
    "Crack board questions easily.",
    "Build strong foundations.",
    "Unlock your potential.",
    "Transform your skills.",
    "Achieve academic excellence.",
    "Boost your confidence.",
    "Study with purpose.",
    "Success starts here."
  ];

  return (
    <div className={`
      max-w-sm w-full h-80 bg-sf-highlight rounded-2xl shadow-2xl 
      transform transition-all duration-700 ease-out
      hover:scale-105 hover:shadow-3xl hover:rotate-1
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      relative overflow-hidden flex flex-col justify-between p-6
    `}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-sf-bg/10 rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-sf-bg/5 rounded-full translate-y-8 -translate-x-8"></div>
      
      {/* Icon with animation */}
      <div className="flex justify-center">
        <div className={`
          p-4 bg-sf-bg/20 rounded-full transform transition-all duration-1000 delay-300
          ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
        `}>
          <FaBookOpen className="w-12 h-12 text-sf-bg animate-pulse" />
        </div>
      </div>
      
      {/* Motivational Text with Typewriter Effect */}
      <div className="text-center flex-1 flex items-center justify-center">
        <h2 className="text-xl font-extrabold text-sf-bg h-16 flex items-center justify-center break-words whitespace-normal overflow-hidden leading-tight px-2">
          <Typewriter
            words={motivationalTexts}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
            cursorColor="#212121"
          />
        </h2>
      </div>
      
      {/* Animated Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Board Questions Stat */}
        <div className={`
          flex flex-col items-center text-center p-3 bg-sf-bg/10 rounded-xl
          transform transition-all duration-700 delay-500
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          hover:bg-sf-bg/20 hover:scale-105 transition-all duration-300
        `}>
          <FaQuestionCircle className="text-xl text-sf-bg mb-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="text-2xl font-bold text-sf-bg">
            {isVisible && (
              <CountUp
                start={0}
                end={400}
                duration={2.5}
                delay={0.8}
                suffix="+"
                useEasing={true}
                separator=","
              />
            )}
          </div>
          <span className="text-xs text-sf-bg/80 font-medium">Board Questions</span>
        </div>

        {/* Success Rate Stat */}
        <div className={`
          flex flex-col items-center text-center p-3 bg-sf-bg/10 rounded-xl
          transform transition-all duration-700 delay-700
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          hover:bg-sf-bg/20 hover:scale-105 transition-all duration-300
        `}>
          <FaChartLine className="text-xl text-sf-bg mb-1 animate-bounce" style={{ animationDelay: '0.7s' }} />
          <div className="text-2xl font-bold text-sf-bg">
            {isVisible && (
              <CountUp
                start={0}
                end={98}
                duration={2.5}
                delay={1.0}
                suffix="%"
                useEasing={true}
              />
            )}
          </div>
          <span className="text-xs text-sf-bg/80 font-medium">Success Rate</span>
        </div>
      </div>

      {/* Subtle pulse animation for the entire card */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-sf-bg/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}