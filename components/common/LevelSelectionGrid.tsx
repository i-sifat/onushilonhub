import LevelSelectionCard, { LevelData, LevelSelectionCardProps } from './LevelSelectionCard';

export interface LevelSelectionGridProps {
  levels: LevelData[];
  basePath: string;
  actionText?: string;
  unavailableText?: string;
  showComingSoon?: boolean;
  className?: string;
  cardClassName?: string;
}

export default function LevelSelectionGrid({
  levels,
  basePath,
  actionText,
  unavailableText,
  showComingSoon,
  className = "",
  cardClassName = ""
}: LevelSelectionGridProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 ${className}`}>
      {levels.map((level) => (
        <LevelSelectionCard
          key={level.id}
          level={level}
          basePath={basePath}
          actionText={actionText}
          unavailableText={unavailableText}
          showComingSoon={showComingSoon}
          className={cardClassName}
        />
      ))}
    </div>
  );
}