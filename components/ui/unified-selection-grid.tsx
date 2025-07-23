import UnifiedSelectionCard, { UnifiedSelectionCardProps } from './unified-selection-card';

export interface UnifiedSelectionGridProps {
  cards: Omit<UnifiedSelectionCardProps, 'className'>[];
  className?: string;
  cardClassName?: string;
}

export default function UnifiedSelectionGrid({
  cards,
  className = "",
  cardClassName = ""
}: UnifiedSelectionGridProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 ${className}`}>
      {cards.map((card, index) => (
        <UnifiedSelectionCard
          key={`${card.type}-${card.section}-${index}`}
          {...card}
          className={cardClassName}
        />
      ))}
    </div>
  );
}