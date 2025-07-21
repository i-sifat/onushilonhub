'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import HeroStatsCard from '@/components/HeroStatsCard';

export default function HeroSection() {
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

          {/* Right Column - Enhanced Stats Card */}
          <div className="flex justify-center items-center">
            <HeroStatsCard />
          </div>
        </div>
      </div>
    </section>
  );
}