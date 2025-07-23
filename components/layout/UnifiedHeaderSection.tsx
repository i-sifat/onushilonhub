'use client';

import { Card } from '@/components/ui/card';
import { BookOpen, Target, Users } from 'lucide-react';

interface UnifiedHeaderSectionProps {
  level: 'HSC' | 'SSC';
  title: string;
  description: string;
  statistics: {
    topics: number;
    rules?: number;
    questions?: number;
  };
  pageType: 'grammar' | 'questions' | 'combined';
}

export default function UnifiedHeaderSection({
  level,
  title,
  description,
  statistics,
  pageType
}: UnifiedHeaderSectionProps) {
  const getStatCards = () => {
    const cards = [
      { icon: BookOpen, value: statistics.topics, label: 'Topics' }
    ];
    
    if (pageType !== 'grammar' && statistics.rules) {
      cards.push({ icon: Target, value: statistics.rules, label: 'Rules' });
    }
    
    if (pageType !== 'grammar' && statistics.questions) {
      cards.push({ icon: Users, value: statistics.questions, label: 'Questions' });
    }
    
    return cards;
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-sf-bg via-sf-bg/98 to-sf-bg/95 p-6 rounded-xl border border-sf-text-muted/10 shadow-lg">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-sf-text-bold">
          {level} {title}
        </h1>
        <p className="text-sf-text-subtle text-lg max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {getStatCards().map((stat, index) => (
          <Card key={index} className="p-4 text-center bg-gradient-to-br from-sf-button/10 to-sf-button/5 border-sf-button/30">
            <div className="space-y-2">
              <stat.icon className="h-6 w-6 text-sf-button mx-auto" />
              <div className="text-2xl font-bold text-sf-text-bold">{stat.value}</div>
              <div className="text-sm text-sf-text-muted font-semibold">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}