'use client';

import Link from 'next/link';
import { Zap, BookOpen, Target, Users, Sparkles, ArrowRight } from 'lucide-react';
import EnhancedHeroStatsCard from '@/components/EnhancedHeroStatsCard';
import DynamicTextRotator from '@/components/ui/dynamic-text-rotator';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/utils/animations';

export default function StudentFriendlyHomepage() {
  const dynamicTexts = [
    "🎓 Your journey to academic excellence starts here",
    "📖 Master HSC & SSC grammar with confidence",
    "🚀 Join thousands of successful students",
    "⭐ Free, comprehensive, and always accessible",
    "💪 Build the skills that matter most",
    "🏆 Turn your grammar struggles into strengths",
    "✨ Learn at your own pace, anytime, anywhere",
    "🔥 Unlock your potential with smart practice"
  ];

  const features = [
    {
      icon: BookOpen,
      title: "500+ Practice Questions",
      description: "Real board questions from previous years"
    },
    {
      icon: Target,
      title: "Smart Learning Path",
      description: "Personalized study plans that work"
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Learn together, succeed together"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sf-bg via-sf-bg to-neutral-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sf-button/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sf-highlight/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sf-button/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Dynamic Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-sf-text-bold">
                Learn Grammar the{' '}
                <span className="bg-gradient-to-r from-sf-button via-sf-highlight to-sf-button bg-clip-text text-transparent animate-pulse">
                  Smart Way
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-sf-text-subtle leading-relaxed">
                Free, comprehensive HSC & SSC grammar resources designed by students, for students.
              </p>
            </div>

            {/* Dynamic rotating text */}
            <div className="bg-sf-button/10 border border-sf-button/20 rounded-2xl p-6 backdrop-blur-sm">
              <DynamicTextRotator 
                texts={dynamicTexts}
                className="text-lg font-semibold text-sf-button"
                speed={3500}
              />
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-neutral-800/50 border border-sf-text-muted/20 rounded-xl p-4 group",
                    "hover:border-sf-button/30 hover:bg-neutral-800/70",
                    animations.enhancedButton.interactiveHover,
                    animations.reveal.fadeIn,
                    `[animation-delay:${300 + index * 100}ms]`
                  )}
                >
                  <feature.icon className={cn(
                    "w-8 h-8 text-sf-button mb-2 transition-all duration-200 ease-out",
                    "group-hover:scale-110 group-hover:rotate-3"
                  )} />
                  <h3 className="font-semibold text-sf-text-bold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-sf-text-subtle">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/get-started" 
                className={cn(
                  "group inline-flex items-center justify-center bg-sf-button text-sf-bg px-8 py-4 rounded-xl font-bold text-lg",
                  animations.enhancedButton.primaryHover,
                  "hover:bg-sf-button/90 hover:shadow-lg hover:shadow-sf-button/25"
                )}
              >
                <Zap className={cn(
                  "w-5 h-5 mr-2 transition-all duration-200 ease-out",
                  "group-hover:animate-bounce group-hover:scale-110"
                )} />
                Get Started
                <ArrowRight className={cn(
                  "w-5 h-5 ml-2 transition-transform duration-200 ease-out",
                  "group-hover:translate-x-1 group-hover:scale-110"
                )} />
              </Link>
              
              <Link 
                href="/board-questions" 
                className={cn(
                  "group inline-flex items-center justify-center bg-transparent border-2 border-sf-button text-sf-button px-8 py-4 rounded-xl font-bold text-lg",
                  animations.enhancedButton.subtleHover,
                  "hover:bg-sf-button hover:text-sf-bg"
                )}
              >
                <BookOpen className={cn(
                  "w-5 h-5 mr-2 transition-all duration-200 ease-out",
                  "group-hover:scale-110"
                )} />
                Practice Questions
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 text-sm text-sf-text-muted">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-sf-button" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-sf-button" />
                <span>1000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-sf-button" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Right: Fixed Dimensions Container for Animated Card */}
          <div className="flex justify-center items-center lg:justify-end">
            <div className="relative w-96 h-[480px] flex items-center justify-center">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-sf-button/20 rounded-3xl blur-2xl scale-110 animate-pulse"></div>
              <div className="relative w-full h-full">
                <EnhancedHeroStatsCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with additional appeal */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        <div className="text-center space-y-4">
          <p className="text-sf-text-subtle text-lg">
            Join the community of students who chose smart learning over hard learning
          </p>
          <div className="flex justify-center items-center space-x-2 text-sf-button">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span className="font-semibold">No registration required • Start immediately</span>
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
}