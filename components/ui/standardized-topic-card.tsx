'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StandardizedTopicCardProps {
  topic: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    color: string;
  };
  section: 'grammar' | 'questions' | 'combined' | 'get-started' | 'grammar-items' | 'board-questions';
  questionCount?: number;
  size?: 'standard';
  showHoverEffects?: boolean;
  className?: string;
}

/**
 * StandardizedTopicCard - A unified topic card component used across all sections
 * 
 * Features:
 * - Consistent sizing and design across all sections
 * - Standardized typography and visual hierarchy
 * - Hover effects and animations
 * - Theme-consistent styling
 * - Responsive design
 */
export const StandardizedTopicCard: React.FC<StandardizedTopicCardProps> = ({
  topic,
  section,
  questionCount,
  size = 'standard',
  showHoverEffects = true,
  className
}) => {
  const pathname = usePathname();
  
  // Determine the correct route based on section
  const getTopicRoute = () => {
    const level = pathname.includes('/hsc') ? 'hsc' : pathname.includes('/ssc') ? 'ssc' : 'hsc';
    
    switch (section) {
      case 'grammar-items':
      case 'grammar':
        return `/grammar-items/${level}/${topic.slug}`;
      case 'board-questions':
      case 'questions':
        return `/board-questions/${level}/${topic.slug}`;
      case 'get-started':
      case 'combined':
      default:
        return `/get-started/${topic.slug}`;
    }
  };

  const route = getTopicRoute();
  const isActive = pathname === route;

  // Standardized card classes with consistent sizing
  const cardClasses = cn(
    // Base styling - consistent across all sections
    "group relative h-full w-full",
    "border border-sf-text-muted/20 bg-neutral-800",
    "rounded-xl transition-all duration-300 ease-out",
    "cursor-pointer overflow-hidden",
    
    // Hover effects (when enabled)
    showHoverEffects && [
      "hover:border-sf-button/50",
      "hover:shadow-lg hover:shadow-sf-button/10",
      "hover:-translate-y-1 hover:scale-[1.02]"
    ],
    
    // Active state styling
    isActive && [
      "ring-2 ring-sf-button/50",
      "border-sf-button/50",
      "bg-neutral-800/80"
    ],
    
    // Size variants (currently only standard)
    size === 'standard' && "min-h-[120px]",
    
    className
  );

  const contentClasses = cn(
    "p-6 h-full flex items-center space-x-4",
    "relative z-10"
  );

  return (
    <Link href={route}>
      <Card className={cardClasses}>
        <CardContent className={contentClasses}>
          {/* Topic Icon */}
          <div 
            className="text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ color: topic.color }}
          >
            {topic.icon}
          </div>
          
          {/* Topic Information */}
          <div className="flex-1 min-w-0">
            {/* Topic Name - Standardized Typography */}
            <h3 className={cn(
              "text-lg font-semibold leading-tight mb-2",
              "text-sf-text-bold group-hover:text-sf-button",
              "transition-colors duration-300",
              "truncate"
            )}>
              {topic.name}
            </h3>
            
            {/* Question Count - Only show for non-grammar sections */}
            {section !== 'grammar-items' && section !== 'grammar' && questionCount && (
              <div className="text-sm text-sf-text-subtle group-hover:text-sf-text-bold transition-colors duration-300">
                {questionCount} Questions
              </div>
            )}
          </div>
          
          {/* Active Indicator */}
          {isActive && (
            <div className="flex-shrink-0">
              <CheckCircle 
                className="h-5 w-5 text-sf-button animate-pulse" 
                data-testid="check-circle" 
              />
            </div>
          )}
          
          {/* Subtle Background Gradient on Hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-5",
            "bg-gradient-to-r from-transparent via-sf-button to-transparent",
            "transition-opacity duration-300 pointer-events-none"
          )} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default StandardizedTopicCard;