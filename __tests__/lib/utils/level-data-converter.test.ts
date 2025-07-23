import { convertLevelDataToUnifiedCard, convertLevelArrayToUnifiedCards } from '@/lib/utils/level-data-converter';
import { LevelData } from '@/components/common/LevelSelectionCard';

describe('level-data-converter', () => {
  const mockLevelData: LevelData = {
    id: 'hsc',
    name: 'HSC (Higher Secondary Certificate)',
    description: 'Advanced grammar topics for HSC students with comprehensive rules, examples, and board questions.',
    features: [
      'Advanced grammar concepts',
      'Detailed rule explanations',
      'Real board questions',
      'Topic-wise organization'
    ],
    stats: {
      topics: '12+',
      rules: '200+',
      questions: '3000+'
    },
    available: true
  };

  describe('convertLevelDataToUnifiedCard', () => {
    it('converts level data to unified card format correctly', () => {
      const result = convertLevelDataToUnifiedCard(mockLevelData, 'grammar', '/grammar-items');

      expect(result).toEqual({
        type: 'HSC',
        section: 'grammar',
        title: 'HSC (Higher Secondary Certificate)',
        description: 'Advanced grammar topics for HSC students with comprehensive rules, examples, and board questions.',
        statistics: {
          topics: 12,
          rules: 200,
          questions: 3000
        },
        route: '/grammar-items/hsc',
        available: true,
        features: [
          'Advanced grammar concepts',
          'Detailed rule explanations',
          'Real board questions',
          'Topic-wise organization'
        ]
      });
    });

    it('handles SSC level correctly', () => {
      const sscData = { ...mockLevelData, id: 'ssc' as const };
      const result = convertLevelDataToUnifiedCard(sscData, 'questions', '/board-questions');

      expect(result.type).toBe('SSC');
      expect(result.route).toBe('/board-questions/ssc');
    });

    it('handles unavailable levels correctly', () => {
      const unavailableData = { ...mockLevelData, available: false };
      const result = convertLevelDataToUnifiedCard(unavailableData, 'grammar', '/grammar-items');

      expect(result.available).toBe(false);
    });

    it('parses different stat formats correctly', () => {
      const dataWithDifferentStats = {
        ...mockLevelData,
        stats: {
          topics: '8+',
          rules: '150+',
          examples: '500+',
          boards: '8',
          years: '10'
        }
      };

      const result = convertLevelDataToUnifiedCard(dataWithDifferentStats, 'grammar', '/grammar-items');

      expect(result.statistics).toEqual({
        topics: 8,
        rules: 150,
        examples: 500,
        boards: 8,
        years: 10
      });
    });

    it('handles invalid stat values gracefully', () => {
      const dataWithInvalidStats = {
        ...mockLevelData,
        stats: {
          topics: 'invalid',
          rules: '',
          questions: 'abc123def'
        }
      };

      const result = convertLevelDataToUnifiedCard(dataWithInvalidStats, 'grammar', '/grammar-items');

      expect(result.statistics).toEqual({
        topics: 0,
        rules: 0,
        questions: 123
      });
    });
  });

  describe('convertLevelArrayToUnifiedCards', () => {
    it('converts array of level data correctly', () => {
      const levelArray: LevelData[] = [
        mockLevelData,
        {
          ...mockLevelData,
          id: 'ssc',
          name: 'SSC (Secondary School Certificate)',
          available: false
        }
      ];

      const result = convertLevelArrayToUnifiedCards(levelArray, 'questions', '/board-questions');

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('HSC');
      expect(result[0].available).toBe(true);
      expect(result[1].type).toBe('SSC');
      expect(result[1].available).toBe(false);
    });

    it('handles empty array', () => {
      const result = convertLevelArrayToUnifiedCards([], 'grammar', '/grammar-items');
      expect(result).toEqual([]);
    });
  });
});