import { LevelData } from '@/components/common/LevelSelectionCard';
import { UnifiedSelectionCardProps } from '@/components/ui/unified-selection-card';

export function convertLevelDataToUnifiedCard(
  level: LevelData,
  section: 'grammar' | 'questions' | 'combined',
  basePath: string
): Omit<UnifiedSelectionCardProps, 'className'> {
  // Convert string stats to numbers
  const parseStatValue = (value: string): number => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  // Convert stats object to statistics format
  const statistics: UnifiedSelectionCardProps['statistics'] = {};
  
  Object.entries(level.stats).forEach(([key, value]) => {
    const numericValue = parseStatValue(value);
    switch (key.toLowerCase()) {
      case 'topics':
        statistics.topics = numericValue;
        break;
      case 'rules':
        statistics.rules = numericValue;
        break;
      case 'questions':
        statistics.questions = numericValue;
        break;
      case 'boards':
        statistics.boards = numericValue;
        break;
      case 'years':
        statistics.years = numericValue;
        break;
      case 'examples':
        statistics.examples = numericValue;
        break;
    }
  });

  return {
    type: level.id.toUpperCase() as 'HSC' | 'SSC',
    section,
    title: level.name,
    description: level.description,
    statistics,
    route: `${basePath}/${level.id}`,
    available: level.available !== false,
    features: level.features
  };
}

export function convertLevelArrayToUnifiedCards(
  levels: LevelData[],
  section: 'grammar' | 'questions' | 'combined',
  basePath: string
): Omit<UnifiedSelectionCardProps, 'className'>[] {
  return levels.map(level => convertLevelDataToUnifiedCard(level, section, basePath));
}