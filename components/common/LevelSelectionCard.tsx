import Link from 'next/link';
import { ArrowRight, GraduationCap, LucideIcon } from 'lucide-react';

export interface LevelStats {
  [key: string]: string;
}

export interface LevelData {
  id: 'hsc' | 'ssc';
  name: string;
  description: string;
  features: string[];
  stats: LevelStats;
  available?: boolean;
}

export interface LevelSelectionCardProps {
  level: LevelData;
  basePath: string;
  actionText?: string;
  unavailableText?: string;
  showComingSoon?: boolean;
  className?: string;
}

export default function LevelSelectionCard({
  level,
  basePath,
  actionText,
  unavailableText = "Coming Soon",
  showComingSoon = true,
  className = ""
}: LevelSelectionCardProps) {
  const isAvailable = level.available !== false;
  const statsKeys = Object.keys(level.stats);
  
  return (
    <div
      className={`bg-sf-bg border rounded-xl p-8 transition-all duration-300 ease-out group ${
        isAvailable 
          ? 'border-sf-text-muted/20 hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer' 
          : 'border-sf-text-muted/20 opacity-75'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-sf-button/20 rounded-lg">
          <GraduationCap className="h-6 w-6 text-sf-button" />
        </div>
        <h2 className="text-2xl font-bold text-sf-text-bold">
          {level.name}
        </h2>
        {!isAvailable && showComingSoon && (
          <div className="ml-auto">
            <span className="text-xs bg-sf-text-muted/20 text-sf-text-muted px-2 py-1 rounded-full">
              {unavailableText}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sf-text-subtle mb-6 leading-relaxed">
        {level.description}
      </p>
      
      {/* Stats */}
      <div className="mb-6">
        <div className={`grid gap-4 ${statsKeys.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {Object.entries(level.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-sf-button">
                {value}
              </div>
              <div className="text-sm text-sf-text-muted capitalize">
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Features:</h3>
        <ul className="space-y-2">
          {level.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sf-text-subtle">
              <div className="w-2 h-2 bg-sf-button rounded-full"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      {isAvailable ? (
        <Link
          href={`${basePath}/${level.id}`}
          className="inline-flex items-center justify-center w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <span>
            {actionText 
              ? actionText.replace('{level}', level.id.toUpperCase())
              : `Start ${level.id.toUpperCase()} Learning`
            }
          </span>
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      ) : (
        <Link
          href={`${basePath}/${level.id}`}
          className="inline-flex items-center justify-center w-full bg-sf-text-muted/20 text-sf-text-muted px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-sf-text-muted/30 hover:scale-[1.01] transition-all duration-200 ease-out"
        >
          <span>View {level.id.toUpperCase()} Status</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      )}
    </div>
  );
}