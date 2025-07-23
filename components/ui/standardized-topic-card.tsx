'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/utils/animations';

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
 * Enhanced Features:
 * - Identical dimensions across all sections (120px min-height, consistent padding)
 * - Standardized typography and visual hierarchy
 * - Consistent hover effects and animations across grammar, questions, and combined sections
 * - Theme-consistent styling with proper color contrast
 * - Responsive design that maintains proportions
 * - Visual consistency when displaying multiple cards in grid layouts
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

  // Enhanced standardized card classes with identical dimensions across all sections
  const cardClasses = cn(
    // Base styling - identical across all sections
    "group relative h-full w-full",
    "border border-sf-text-muted/20 bg-neutral-800",
    "rounded-xl overflow-hidden",
    
    // Consistent dimensions - identical across all sections
    "min-h-[120px] max-h-[120px]", // Fixed height for grid consistency
    
    // Enhanced animation preset for consistent hover effects
    showHoverEffects && [
      "transition-all duration-300 ease-out",
      "hover:border-sf-button/50",
      "hover:shadow-lg hover:shadow-sf-button/10",
      "hover:-translate-y-1 hover:scale-[1.01]",
      "cursor-pointer"
    ],
    
    // Disabled hover effects when specified
    !showHoverEffects && [
      "transition-all duration-300 ease-out",
      "hover:transform-none hover:shadow-none hover:border-sf-text-muted/20"
    ],
    
    // Active state styling with consistent animation
    isActive && [
      "ring-2 ring-sf-button/50",
      "border-sf-button/50",
      "bg-neutral-800/80",
      "animate-in zoom-in-95 duration-200"
    ],
    
    className
  );

  // Consistent content layout with standardized padding
  const contentClasses = cn(
    "p-6 h-full flex items-center space-x-4",
    "relative z-10"
  );

  // Standardized icon styling
  const iconClasses = cn(
    "text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center",
    "transition-transform duration-300 ease-out",
    showHoverEffects && "group-hover:scale-110"
  );

  // Standardized typography classes
  const titleClasses = cn(
    "text-lg font-semibold leading-tight mb-2",
    "text-sf-text-bold group-hover:text-sf-button",
    "transition-colors duration-300",
    "truncate"
  );

  const subtitleClasses = cn(
    "text-sm text-sf-text-subtle group-hover:text-sf-text-bold",
    "transition-colors duration-300",
    "flex items-center space-x-1"
  );

  return (
    <Link href={route} className="block h-full">
      <Card className={cardClasses}>
        <CardContent className={contentClasses}>
          {/* Topic Icon - Consistent sizing and positioning */}
          <div 
            className={iconClasses}
            style={{ color: topic.color }}
          >
            {topic.icon}
          </div>
          
          {/* Topic Information - Standardized layout */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {/* Topic Name - Consistent typography */}
            <h3 className={titleClasses}>
              {topic.name}
            </h3>
            
            {/* Question Count or Grammar Rules indicator */}
            {section !== 'grammar-items' && section !== 'grammar' && questionCount ? (
              <div className={subtitleClasses}>
                <BookOpen className="h-3 w-3 flex-shrink-0" />
                <span>{questionCount} Questions</span>
              </div>
            ) : (
              <div className={subtitleClasses}>
                <BookOpen className="h-3 w-3 flex-shrink-0" />
                <span>Grammar Rules</span>
              </div>
            )}
          </div>
          
          {/* Active Indicator - Consistent positioning */}
          {isActive && (
            <div className="flex-shrink-0">
              <CheckCircle 
                className="h-5 w-5 text-sf-button animate-pulse" 
                data-testid="check-circle" 
              />
            </div>
          )}
          
          {/* Enhanced Background Gradient on Hover - Consistent across all sections */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-5",
            "bg-gradient-to-r from-transparent via-sf-button to-transparent",
            "transition-opacity duration-300 pointer-events-none"
          )} />
          
          {/* Subtle border highlight on hover - Additional consistency */}
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
            "ring-1 ring-inset ring-sf-button/20",
            "transition-opacity duration-300 pointer-events-none"
          )} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default StandardizedTopicCard;