import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/utils/animations';

export interface UnifiedSelectionCardProps {
  type: 'HSC' | 'SSC';
  section: 'grammar' | 'questions' | 'combined';
  title: string;
  description: string;
  statistics: {
    topics?: number;
    rules?: number;
    questions?: number;
    boards?: number;
    years?: number;
    examples?: number;
  };
  route: string;
  available?: boolean;
  features?: string[];
  className?: string;
}

export default function UnifiedSelectionCard({
  type,
  section,
  title,
  description,
  statistics,
  route,
  available = true,
  features = [],
  className = ""
}: UnifiedSelectionCardProps) {
  const getSectionIcon = () => {
    switch (section) {
      case 'grammar':
        return '📚';
      case 'questions':
        return '📝';
      case 'combined':
        return '🚀';
      default:
        return '📖';
    }
  };

  const getStatisticsDisplay = () => {
    const stats = [];
    if (statistics.topics) stats.push({ label: 'Topics', value: statistics.topics });
    if (statistics.rules) stats.push({ label: 'Rules', value: statistics.rules });
    if (statistics.questions) stats.push({ label: 'Questions', value: statistics.questions });
    if (statistics.boards) stats.push({ label: 'Boards', value: statistics.boards });
    if (statistics.years) stats.push({ label: 'Years', value: statistics.years });
    if (statistics.examples) stats.push({ label: 'Examples', value: statistics.examples });
    return stats;
  };

  const formatStatValue = (value: number): string => {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}k+`;
    }
    return `${value}+`;
  };

  return (
    <div
      className={cn(
        "bg-sf-bg border rounded-xl p-8 group w-full h-full min-h-[500px]",
        available 
          ? cn(
              "border-sf-text-muted/20 cursor-pointer",
              animations.presets.levelCard
            )
          : "border-sf-text-muted/20 opacity-75",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "text-2xl transition-transform duration-200 ease-out",
            "group-hover:scale-110 group-hover:rotate-3"
          )}>
            {getSectionIcon()}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className={cn(
                "px-2 py-1 text-xs font-semibold rounded-full border",
                "bg-sf-button/10 text-sf-button border-sf-button/30",
                "transition-all duration-200 ease-out",
                "group-hover:bg-sf-button/20 group-hover:scale-105"
              )}>
                {type}
              </span>
              <span className="text-sf-text-muted text-sm capitalize">
                {section}
              </span>
            </div>
            <h3 className={cn(
              "text-xl font-bold text-sf-text-bold transition-colors duration-200",
              "group-hover:text-sf-button"
            )}>
              {title}
            </h3>
          </div>
        </div>
        
        {!available && (
          <span className="text-xs bg-sf-text-muted/20 text-sf-text-muted px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>
      
      {/* Description */}
      <p className="text-sf-text-subtle mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Statistics */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          {getStatisticsDisplay().slice(0, 3).map((stat, index) => (
            <div 
              key={index} 
              className={cn(
                "text-center transition-all duration-200 ease-out",
                "group-hover:scale-105",
                animations.reveal.fadeIn,
                `[animation-delay:${100 + index * 50}ms]`
              )}
            >
              <div className={cn(
                "text-xl font-bold text-sf-button transition-colors duration-200",
                "group-hover:text-sf-highlight"
              )}>
                {formatStatValue(stat.value)}
              </div>
              <div className="text-xs text-sf-text-muted font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features */}
      {features.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-sf-text-bold mb-3">Features:</h4>
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li 
                key={index} 
                className={cn(
                  "flex items-center space-x-2 text-sm text-sf-text-subtle",
                  "transition-all duration-200 ease-out",
                  "group-hover:text-sf-text-bold group-hover:translate-x-1",
                  animations.reveal.fadeIn,
                  `[animation-delay:${200 + index * 75}ms]`
                )}
              >
                <div className={cn(
                  "w-1.5 h-1.5 bg-sf-button rounded-full flex-shrink-0",
                  "transition-all duration-200 ease-out",
                  "group-hover:scale-125 group-hover:bg-sf-highlight"
                )}></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Action Button */}
      <div className="pt-2">
        {available ? (
          <Link
            href={route}
            className={cn(
              "inline-flex items-center justify-center w-full bg-sf-button text-sf-bg px-6 py-3 rounded-lg font-semibold group",
              animations.enhancedButton.primaryHover,
              "hover:bg-sf-button/90 hover:shadow-lg hover:shadow-sf-button/20",
              "active:scale-[0.98]"
            )}
          >
            <span>
              Explore {type} {section === 'grammar' ? 'Grammar' : section === 'questions' ? 'Questions' : 'Learning'}
            </span>
            <ArrowRight className={cn(
              "ml-2 h-4 w-4 transition-transform duration-200 ease-out",
              "group-hover:translate-x-1 group-hover:scale-110"
            )} />
          </Link>
        ) : (
          <div className="inline-flex items-center justify-center w-full bg-sf-text-muted/20 text-sf-text-muted px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
            <span>Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  );
}