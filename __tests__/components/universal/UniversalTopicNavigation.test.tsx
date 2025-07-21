import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the data imports
jest.mock('@/data/topics', () => ({
  getActiveTopics: jest.fn(),
  TopicConfig: {}
}));

jest.mock('@/data/grammar-rules', () => ({
  grammarRulesData: {
    'completing-sentence': {
      rules: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    'connectors': {
      rules: [{ id: 1 }, { id: 2 }]
    }
  }
}));

jest.mock('@/data/questions', () => ({
  questionsData: {
    'completing-sentence': {
      questions: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]
    },
    'connectors': {
      questions: [{ id: '1' }, { id: '2' }, { id: '3' }]
    }
  }
}));

const mockTopics = [
  {
    id: 'completing-sentence',
    name: 'Completing Sentence',
    slug: 'completing-sentence',
    description: 'Learn to complete sentences using appropriate grammar rules',
    level: 'HSC',
    order: 1,
    isActive: true,
    category: 'both',
    icon: '📝',
    color: '#3B82F6',
    difficulty: 'MEDIUM',
    estimatedTime: 45,
    prerequisites: [],
    tags: ['sentence-completion', 'grammar-rules'],
    routes: {
      grammarRules: '/grammar-items/hsc/completing-sentence',
      questions: '/board-questions/hsc/completing-sentence',
      practice: '/get-started/completing-sentence'
    }
  },
  {
    id: 'connectors',
    name: 'Connectors',
    slug: 'connectors',
    description: 'Master the use of linking words and connectors',
    level: 'HSC',
    order: 2,
    isActive: true,
    category: 'both',
    icon: '🔗',
    color: '#10B981',
    difficulty: 'HARD',
    estimatedTime: 60,
    prerequisites: [],
    tags: ['linking-words', 'coherence'],
    routes: {
      grammarRules: '/grammar-items/hsc/connectors',
      questions: '/board-questions/hsc/connectors',
      practice: '/get-started/connectors'
    }
  }
];

describe('UniversalTopicNavigation', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/get-started');
    
    // Mock the getActiveTopics function
    const { getActiveTopics } = require('@/data/topics');
    getActiveTopics.mockReturnValue(mockTopics);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders topic navigation with correct title and description', () => {
    render(<UniversalTopicNavigation level="HSC" />);
    
    expect(screen.getByText('HSC Get Started with Learning')).toBeInTheDocument();
    expect(screen.getByText('Begin your learning journey with interactive lessons and practice exercises')).toBeInTheDocument();
  });

  it('displays topic cards with correct information', () => {
    render(<UniversalTopicNavigation level="HSC" showStats={true} />);
    
    expect(screen.getByText('Completing Sentence')).toBeInTheDocument();
    expect(screen.getByText('Connectors')).toBeInTheDocument();
    expect(screen.getByText('Learn to complete sentences using appropriate grammar rules')).toBeInTheDocument();
    expect(screen.getByText('Master the use of linking words and connectors')).toBeInTheDocument();
  });

  it('shows statistics when showStats is true', () => {
    render(<UniversalTopicNavigation level="HSC" showStats={true} />);
    
    // Should show overall statistics
    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getAllByText('Rules')).toHaveLength(3); // 1 in header + 2 in topic cards
    expect(screen.getAllByText('Questions')).toHaveLength(3); // 1 in header + 2 in topic cards
  });

  it('shows progress indicators when showProgress is true', () => {
    render(<UniversalTopicNavigation level="HSC" showProgress={true} />);
    
    expect(screen.getAllByText('Progress')).toHaveLength(3); // 1 in header + 2 in topic cards
  });

  it('filters topics based on search query', async () => {
    render(<UniversalTopicNavigation level="HSC" showSearch={true} />);
    
    const searchInput = screen.getByPlaceholderText('Search topics, descriptions, or tags...');
    fireEvent.change(searchInput, { target: { value: 'completing' } });
    
    await waitFor(() => {
      expect(screen.getByText('Completing Sentence')).toBeInTheDocument();
      expect(screen.queryByText('Connectors')).not.toBeInTheDocument();
    });
  });

  it('filters topics based on difficulty', async () => {
    render(<UniversalTopicNavigation level="HSC" showFilters={true} />);
    
    // Open filters panel
    const filtersButton = screen.getByText('Filters');
    fireEvent.click(filtersButton);
    
    // Wait for filters panel to appear
    await waitFor(() => {
      expect(screen.getByText('All Levels')).toBeInTheDocument();
    });
    
    // Select HARD difficulty
    const difficultySelect = screen.getByText('All Levels');
    fireEvent.click(difficultySelect);
    
    const hardOption = screen.getByText('Hard');
    fireEvent.click(hardOption);
    
    await waitFor(() => {
      expect(screen.getByText('Connectors')).toBeInTheDocument();
      expect(screen.queryByText('Completing Sentence')).not.toBeInTheDocument();
    });
  });

  it('shows different sections correctly', () => {
    const { rerender } = render(<UniversalTopicNavigation level="HSC" section="grammar-items" />);
    expect(screen.getByText('HSC Grammar Rules & Concepts')).toBeInTheDocument();
    
    rerender(<UniversalTopicNavigation level="HSC" section="board-questions" />);
    expect(screen.getByText('HSC Board Questions & Practice')).toBeInTheDocument();
    
    rerender(<UniversalTopicNavigation level="HSC" section="get-started" />);
    expect(screen.getByText('HSC Get Started with Learning')).toBeInTheDocument();
  });

  it('shows no results message when no topics match filters', async () => {
    render(<UniversalTopicNavigation level="HSC" showSearch={true} />);
    
    const searchInput = screen.getByPlaceholderText('Search topics, descriptions, or tags...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent topic' } });
    
    await waitFor(() => {
      expect(screen.getByText('No topics found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filter criteria')).toBeInTheDocument();
    });
  });

  it('clears filters when clear button is clicked', async () => {
    render(<UniversalTopicNavigation level="HSC" showSearch={true} />);
    
    // Apply a search filter
    const searchInput = screen.getByPlaceholderText('Search topics, descriptions, or tags...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent topic' } });
    
    await waitFor(() => {
      expect(screen.getByText('No topics found')).toBeInTheDocument();
    });
    
    // Clear filters
    const clearButton = screen.getByText('Clear all filters');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.getByText('Completing Sentence')).toBeInTheDocument();
      expect(screen.getByText('Connectors')).toBeInTheDocument();
    });
  });

  it('sorts topics correctly', async () => {
    render(<UniversalTopicNavigation level="HSC" showFilters={true} />);
    
    // Open filters panel
    const filtersButton = screen.getByText('Filters');
    fireEvent.click(filtersButton);
    
    // Wait for filters panel to appear
    await waitFor(() => {
      expect(screen.getByText('Default')).toBeInTheDocument();
    });
    
    // Change sort to name
    const sortSelect = screen.getByText('Default');
    fireEvent.click(sortSelect);
    
    const nameOption = screen.getByText('Name');
    fireEvent.click(nameOption);
    
    await waitFor(() => {
      const topicCards = screen.getAllByRole('link');
      // First card should be "Completing Sentence" (alphabetically first)
      expect(topicCards[0]).toHaveTextContent('Completing Sentence');
    });
  });

  it('shows topic tags and prerequisites', () => {
    const topicsWithPrerequisites = [
      {
        ...mockTopics[0],
        prerequisites: ['basic-grammar'],
        tags: ['sentence-completion', 'grammar-rules', 'conditional', 'clauses']
      }
    ];
    
    const { getActiveTopics } = require('@/data/topics');
    getActiveTopics.mockReturnValue(topicsWithPrerequisites);
    
    render(<UniversalTopicNavigation level="HSC" />);
    
    expect(screen.getByText('sentence-completion')).toBeInTheDocument();
    expect(screen.getByText('grammar-rules')).toBeInTheDocument();
    expect(screen.getByText('Requires: basic-grammar')).toBeInTheDocument();
  });

  it('handles different levels correctly', () => {
    render(<UniversalTopicNavigation level="SSC" />);
    
    expect(screen.getByText('SSC Get Started with Learning')).toBeInTheDocument();
  });

  it('shows estimated time for topics', () => {
    render(<UniversalTopicNavigation level="HSC" />);
    
    expect(screen.getByText('45m')).toBeInTheDocument();
    expect(screen.getByText('60m')).toBeInTheDocument();
  });

  it('highlights active topic based on current pathname', () => {
    mockUsePathname.mockReturnValue('/get-started/completing-sentence');
    
    render(<UniversalTopicNavigation level="HSC" />);
    
    // The active topic card should have a checkmark icon
    const checkCircleIcons = screen.getAllByTestId('check-circle');
    expect(checkCircleIcons).toHaveLength(1);
  });
});