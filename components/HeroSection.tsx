'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, BookOpen, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const motivationalTexts = [
    "Learn faster and smarter.",
    "Master grammar with confidence.",
    "Ace your exams with ease.",
    "Build strong foundations.",
    "Unlock your potential.",
    "Transform your skills.",
    "Achieve academic excellence.",
    "Boost your confidence.",
    "Study with purpose.",
    "Success starts here.",
    "Excel beyond expectations.",
    "Smart learning, bright future."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % motivationalTexts.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [motivationalTexts.length]);

  return (
    <section className="min-h-screen bg-sf-bg flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-sf-text-bold">
              Excel in HSC & SSC Grammar with{' '}
              <span className="text-sf-button">Smart, Strategic Learning</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-sf-text-subtle max-w-2xl leading-relaxed">
              Get all board questions, rules, and topic-wise analysis in one place. 
              Filter by board, year, or chapter —
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/get-started" 
                className="inline-flex items-center justify-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-sf-button/25 animate-glow"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center items-center">
            <div className="bg-sf-highlight rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center space-y-6">
                <div className="flex justify-center animate-bounce">
                  <BookOpen className="w-16 h-16 text-sf-bg" />
                </div>
                
                <div className="space-y-4">
                                 
                  <div className="h-16 flex items-center justify-center">
                    <p 
                      className={`text-lg font-medium text-sf-bg transition-opacity duration-300 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {motivationalTexts[currentTextIndex]}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sf-bg">5000+</div>
                    <div className="text-sm text-sf-bg/70">Board Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sf-bg">98%</div>
                    <div className="text-sm text-sf-bg/70">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}