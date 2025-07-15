import { GraduationCap, Target, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide comprehensive, accessible, and effective grammar learning resources for HSC and SSC students across Bangladesh."
    },
    {
      icon: Users,
      title: "For Students",
      description: "Designed specifically for HSC and SSC students who want to excel in English grammar with strategic, focused learning."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Our systematic approach has helped thousands of students achieve better grades and build confidence in English grammar."
    }
  ];

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <GraduationCap className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            About <span className="text-sf-button">OnushilonHub</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto leading-relaxed">
            We're dedicated to helping HSC and SSC students master English grammar through 
            smart, strategic learning with comprehensive resources and proven methodologies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-6 text-center hover:border-sf-button/50 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-sf-button/20 rounded-full">
                  <feature.icon className="h-8 w-8 text-sf-button" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-sf-text-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-sf-text-subtle">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6">Our Story</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-sf-text-subtle leading-relaxed mb-4">
              OnushilonHub was born from a simple observation: students across Bangladesh 
              were struggling with English grammar not because they lacked ability, but 
              because they lacked access to organized, comprehensive learning resources.
            </p>
            <p className="text-sf-text-subtle leading-relaxed mb-4">
              We recognized that board questions from different years and regions were 
              scattered, grammar rules were fragmented across various sources, and students 
              had no systematic way to track their progress or identify weak areas.
            </p>
            <p className="text-sf-text-subtle leading-relaxed">
              That's why we created OnushilonHub - a centralized platform that brings 
              together thousands of board questions, comprehensive grammar rules, and 
              smart filtering tools to help students learn more effectively and achieve 
              better results.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-8 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">
                Comprehensive Question Database
              </h3>
              <p className="text-sf-text-subtle">
                Access thousands of HSC and SSC board questions from 2016-2025, 
                organized by year, board, and grammar topic for targeted practice.
              </p>
            </div>
            <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">
                Detailed Grammar Rules
              </h3>
              <p className="text-sf-text-subtle">
                Clear, comprehensive grammar rules with examples and explanations 
                for every topic covered in HSC and SSC curricula.
              </p>
            </div>
            <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">
                Smart Filtering System
              </h3>
              <p className="text-sf-text-subtle">
                Advanced filtering options to find exactly what you need - 
                filter by topic, board, year, or search for specific content.
              </p>
            </div>
            <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">
                Topic-wise Analysis
              </h3>
              <p className="text-sf-text-subtle">
                Understand question patterns and frequency analysis to focus 
                your preparation on the most important topics.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-sf-highlight/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-4">
            Ready to Excel in Grammar?
          </h2>
          <p className="text-sf-text-subtle mb-6">
            Join thousands of students who have improved their English grammar skills with OnushilonHub.
          </p>
          <a
            href="/board-questions"
            className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
          >
            Start Learning Now
          </a>
        </div>
      </div>
    </div>
  );
}