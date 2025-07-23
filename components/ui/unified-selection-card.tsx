import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
      className={`bg-sf-bg border rounded-xl p-8 transition-all duration-300 ease-out group ${
        available 
          ? 'border-sf-text-muted/20 hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer' 
          : 'border-sf-text-muted/20 opacity-75'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getSectionIcon()}</div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-1 text-xs font-semibold rounded-full border bg-sf-button/10 text-sf-button border-sf-button/30">
                {type}
              </span>
              <span className="text-sf-text-muted text-sm capitalize">
                {section}
              </span>
            </div>
            <h3 className="text-xl font-bold text-sf-text-bold group-hover:text-sf-button transition-colors">
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
            <div key={index} className="text-center">
              <div className="text-xl font-bold text-sf-button">
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
              <li key={index} className="flex items-center space-x-2 text-sm text-sf-text-subtle">
                <div className="w-1.5 h-1.5 bg-sf-button rounded-full flex-shrink-0"></div>
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
            className="inline-flex items-center justify-center w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>
              Explore {type} {section === 'grammar' ? 'Grammar' : section === 'questions' ? 'Questions' : 'Learning'}
            </span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
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