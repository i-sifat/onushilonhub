'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StandardizedTopicCard } from '@/components/ui/standardized-topic-card';
import { ViewModeToggle, ViewMode } from '@/components/ui/view-mode-toggle';
import SearchInput from '@/components/common/SearchInput';
import LevelSelectionCard from '@/components/common/LevelSelectionCard';
import { animations } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  Star, 
  Zap, 
  Target, 
  BookOpen, 
  Users, 
  Award,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

export default function TestAnimationsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Sample data for testing
  const sampleTopics = [
    {
      id: 'completing-sentence',
      name: 'Completing Sentence',
      slug: 'completing-sentence',
      icon: '📝',
      color: '#3B82F6'
    },
    {
      id: 'connectors',
      name: 'Connectors',
      slug: 'connectors',
      icon: '🔗',
      color: '#10B981'
    },
    {
      id: 'transformation',
      name: 'Transformation',
      slug: 'transformation',
      icon: '🔄',
      color: '#EF4444'
    }
  ];

  const levelData = {
    id: 'hsc' as const,
    name: 'HSC Level',
    description: 'Advanced grammar concepts and practice questions for Higher Secondary Certificate students.',
    features: [
      'Advanced grammar rules and structures',
      'Board question patterns and solutions',
      'Comprehensive practice materials',
      'Expert explanations and examples'
    ],
    stats: {
      topics: '9',
      rules: '112',
      questions: '74'
    },
    available: true
  };

  return (
    <div className="min-h-screen bg-sf-bg text-sf-text-subtle p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-sf-text-bold">Animation System Demo</h1>
          <p className="text-lg text-sf-text-subtle">
            Showcasing subtle, professional animations and interactions throughout the website
          </p>
        </div>

        {/* Button Animations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Button Animations</h2>
          <p className="text-sf-text-subtle">
            Buttons with hover lift, scale effects, and smooth transitions
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="default" className={animations.presets.primaryButton}>
              <Star className="h-4 w-4 mr-2" />
              Primary Button
            </Button>
            
            <Button variant="outline" className={animations.button.subtle}>
              <Heart className="h-4 w-4 mr-2" />
              Outline Button
            </Button>
            
            <Button variant="ghost" className={animations.button.ghost}>
              <Zap className="h-4 w-4 mr-2" />
              Ghost Button
            </Button>
            
            <Button variant="secondary" className={animations.button.subtle}>
              <Target className="h-4 w-4 mr-2" />
              Secondary
            </Button>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-sf-text-bold mb-4">Interactive Action Button</h3>
            <Button 
              size="lg" 
              className={cn(
                animations.presets.primaryButton,
                "group"
              )}
            >
              Get Started Learning
              <ArrowRight className={cn("ml-2 h-5 w-5", animations.icon.arrow)} />
            </Button>
          </div>
        </section>

        {/* Card Animations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Card Animations</h2>
          <p className="text-sf-text-subtle">
            Cards with hover lift, scale, glow effects, and smooth transitions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Card */}
            <Card className={animations.presets.questionCard}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-sf-button" />
                  Interactive Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sf-text-subtle mb-4">
                  This card demonstrates hover lift, scale, and glow effects.
                </p>
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Hover Me
                </Badge>
              </CardContent>
            </Card>

            {/* Selection Card */}
            <Card className={animations.presets.levelCard}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sf-button" />
                  Selection Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sf-text-subtle mb-4">
                  Enhanced selection card with stronger hover effects.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sf-button border-sf-button/30">
                    Enhanced
                  </Badge>
                  <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold">
                    Hover
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Topic Card */}
            <Card className={animations.presets.topicCard}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-sf-button" />
                  Topic Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sf-text-subtle mb-4">
                  Topic card with icon scaling and border color transitions.
                </p>
                <div className="text-2xl mb-2">📚</div>
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  25 Questions
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Standardized Topic Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Standardized Topic Cards</h2>
          <p className="text-sf-text-subtle">
            Consistent topic cards with icon animations and hover effects
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleTopics.map((topic) => (
              <StandardizedTopicCard
                key={topic.id}
                topic={topic}
                section="board-questions"
                questionCount={Math.floor(Math.random() * 50) + 10}
                showHoverEffects={true}
              />
            ))}
          </div>
        </section>

        {/* Input Animations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Input Animations</h2>
          <p className="text-sf-text-subtle">
            Search inputs with focus scaling, border transitions, and icon animations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-sf-text-bold">Search Input</h3>
              <SearchInput
                placeholder="Search with animations..."
                value={searchValue}
                onChange={setSearchValue}
                className={animations.presets.searchInput}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-sf-text-bold">View Mode Toggle</h3>
              <ViewModeToggle 
                viewMode={viewMode} 
                onViewModeChange={setViewMode}
              />
            </div>
          </div>
        </section>

        {/* Answer Elements Animation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Answer Elements</h2>
          <p className="text-sf-text-subtle">
            Interactive answer elements with theme-consistent hover animations
          </p>
          
          <div className="bg-neutral-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-medium text-sf-text-bold">Sample Passage with Interactive Blanks</h3>
            <div className="text-sf-text-subtle leading-relaxed">
              <p>
                The quick brown fox{' '}
                <span className="inline-flex items-center bg-sf-button/20 text-sf-button border border-sf-button/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-sf-button/40 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-out active:scale-95">
                  [jumps]
                </span>{' '}
                over the lazy dog. This sentence{' '}
                <span className="inline-flex items-center bg-green-500/20 text-green-400 border border-green-400/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-green-500/40 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-out active:scale-95">
                  contains
                </span>{' '}
                every letter of the alphabet.
              </p>
            </div>
            <p className="text-xs text-sf-text-muted">
              💡 Hover over the answer elements to see the enhanced animations
            </p>
          </div>
        </section>

        {/* Level Selection Card */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Level Selection Card</h2>
          <p className="text-sf-text-subtle">
            Enhanced level selection with hover lift, scale, and button animations
          </p>
          
          <div className="max-w-md">
            <LevelSelectionCard
              level={levelData}
              basePath="/test-animations"
              actionText="Explore {level} Animations"
            />
          </div>
        </section>

        {/* Animation Utilities Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Animation Utilities</h2>
          <p className="text-sf-text-subtle">
            Demonstration of individual animation utility classes
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={cn(
              "bg-neutral-800 p-4 rounded-lg text-center cursor-pointer",
              animations.card.hoverLift,
              animations.base.transitionSlow
            )}>
              <div className="text-2xl mb-2">⬆️</div>
              <p className="text-sm text-sf-text-subtle">Hover Lift</p>
            </div>
            
            <div className={cn(
              "bg-neutral-800 p-4 rounded-lg text-center cursor-pointer",
              animations.card.hoverScale,
              animations.base.transitionSlow
            )}>
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-sm text-sf-text-subtle">Hover Scale</p>
            </div>
            
            <div className={cn(
              "bg-neutral-800 p-4 rounded-lg text-center cursor-pointer",
              animations.card.hoverGlow,
              animations.base.transitionSlow
            )}>
              <div className="text-2xl mb-2">✨</div>
              <p className="text-sm text-sf-text-subtle">Hover Glow</p>
            </div>
            
            <div className={cn(
              "bg-neutral-800 p-4 rounded-lg text-center cursor-pointer",
              animations.card.subtle
            )}>
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-sf-text-subtle">Combined</p>
            </div>
          </div>
        </section>

        {/* Icon Animations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Icon Animations</h2>
          <p className="text-sf-text-subtle">
            Interactive icons with scaling and movement effects
          </p>
          
          <div className="flex items-center gap-8 justify-center bg-neutral-800 rounded-xl p-8">
            <div className="text-center">
              <Search className={cn("h-8 w-8 text-sf-button mb-2", animations.icon.subtle)} />
              <p className="text-sm text-sf-text-subtle">Scale</p>
            </div>
            
            <div className="text-center group">
              <ArrowRight className={cn("h-8 w-8 text-sf-button mb-2", animations.icon.arrow)} />
              <p className="text-sm text-sf-text-subtle">Slide Right</p>
            </div>
            
            <div className="text-center">
              <Filter className={cn("h-8 w-8 text-sf-button mb-2", animations.icon.interactive)} />
              <p className="text-sm text-sf-text-subtle">Interactive</p>
            </div>
            
            <div className="text-center">
              <Star className={cn("h-8 w-8 text-sf-button mb-2", animations.icon.subtle)} />
              <p className="text-sm text-sf-text-subtle">Subtle</p>
            </div>
          </div>
        </section>

        {/* Performance Note */}
        <section className="bg-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-sf-text-bold mb-4">Animation Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-sf-text-subtle">
            <div>
              <h4 className="font-medium text-sf-text-bold mb-2">Optimizations:</h4>
              <ul className="space-y-1">
                <li>• Hardware-accelerated transforms (translate, scale)</li>
                <li>• Consistent timing functions (ease-out)</li>
                <li>• Minimal duration (150-300ms)</li>
                <li>• CSS transitions over JavaScript animations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sf-text-bold mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Subtle effects that enhance, don't distract</li>
                <li>• Theme-consistent colors and timing</li>
                <li>• Accessible and performant on all devices</li>
                <li>• Professional appearance maintained</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}