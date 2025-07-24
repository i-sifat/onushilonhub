'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Typewriter } from 'react-simple-typewriter';
import { FaQuestionCircle, FaBookOpen, FaUsers, FaTrophy, FaRocket } from 'react-icons/fa';

export default function EnhancedHeroStatsCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const motivationalTexts = [
    "🚀 Ready to ace your exams?",
    "📚 Master grammar like never before!",
    "⭐ Join thousands of successful students",
    "🎯 Practice makes perfect",
    "💪 Build unshakeable confidence",
    "🏆 Unlock your true potential",
    "✨ Transform your learning journey",
    "🔥 Ignite your academic success",
    "🌟 Your success story starts here",
    "💡 Smart learning, brilliant results"
  ];

  const stats = [
    {
      icon: FaQuestionCircle,
      value: 500,
      suffix: '+',
      label: 'Practice Questions',
      color: 'text-blue-400',
      delay: 0.5
    },
    {
      icon: FaBookOpen,
      value: 120,
      suffix: '+',
      label: 'Grammar Rules',
      color: 'text-green-400',
      delay: 0.7
    },
    {
      icon: FaUsers,
      value: 1000,
      suffix: '+',
      label: 'Happy Students',
      color: 'text-purple-400',
      delay: 0.9
    },
    {
      icon: FaTrophy,
      value: 98,
      suffix: '%',
      label: 'Success Rate',
      color: 'text-yellow-400',
      delay: 1.1
    }
  ];

  return (
    <div className={`
      w-96 h-[480px] bg-gradient-to-br from-sf-highlight via-sf-button to-sf-highlight 
      rounded-3xl shadow-2xl transform transition-all duration-1000 ease-out
      hover:scale-105 hover:shadow-3xl hover:rotate-1
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
      relative overflow-hidden p-8 flex flex-col justify-between
    `}>
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sf-bg/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-sf-bg/5 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-sf-bg/5 rounded-full -translate-x-10 -translate-y-10 animate-pulse delay-500"></div>
      
      {/* Main icon with enhanced animation */}
      <div className="flex justify-center mb-6">
        <div className={`
          p-6 bg-sf-bg/20 rounded-full transform transition-all duration-1000 delay-300
          ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
          hover:scale-110 hover:bg-sf-bg/30 transition-all duration-300
        `}>
          <FaRocket className="w-16 h-16 text-sf-bg animate-bounce" />
        </div>
      </div>
      
      {/* Enhanced motivational text with fixed container */}
      <div className="text-center flex-1 flex items-center justify-center mb-6">
        <div className="h-16 w-full overflow-hidden flex items-center justify-center px-4">
          <h2 className="text-xl font-extrabold text-sf-bg text-center leading-tight">
            <Typewriter
              words={motivationalTexts}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2500}
              cursorColor="#212121"
            />
          </h2>
        </div>
      </div>
      
      {/* Enhanced stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`
              flex flex-col items-center text-center p-4 bg-sf-bg/15 rounded-2xl
              transform transition-all duration-700 delay-${Math.floor(stat.delay * 1000)}
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              hover:bg-sf-bg/25 hover:scale-105 transition-all duration-300
              border border-sf-bg/10 backdrop-blur-sm
            `}
          >
            <stat.icon 
              className={`text-2xl text-sf-bg mb-2 animate-bounce ${stat.color}`} 
              style={{ animationDelay: `${stat.delay}s` }} 
            />
            <div className="text-3xl font-bold text-sf-bg mb-1">
              {isVisible && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  delay={stat.delay + 0.3}
                  suffix={stat.suffix}
                  useEasing={true}
                  separator=","
                />
              )}
            </div>
            <span className="text-sm text-sf-bg/90 font-medium leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-sf-bg/20 rounded-full animate-ping`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-sf-bg/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}