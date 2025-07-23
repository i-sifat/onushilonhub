'use client';

import { useState, useEffect } from 'react';

interface DynamicTextRotatorProps {
  texts: string[];
  className?: string;
  speed?: number;
}

export default function DynamicTextRotator({ 
  texts, 
  className = '', 
  speed = 3000 
}: DynamicTextRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 300);
    }, speed);

    return () => clearInterval(interval);
  }, [texts.length, speed]);

  return (
    <div className={`transition-all duration-300 ${className}`}>
      <span 
        className={`inline-block transition-all duration-300 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-2'
        }`}
      >
        {texts[currentIndex]}
      </span>
    </div>
  );
}