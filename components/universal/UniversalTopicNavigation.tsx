'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Target, 
  Search, 
  Filter,
  Users,
  CheckCircle
} from 'lucide-react';
import { TopicConfig, getActiveTopics } from '@/data/topics';
import { grammarRulesData } from '@/data/grammar-rules';
import { questionsData } from '@/data/questions';
import { GrammarLevel } from '@/types/grammar.types';

interface UniversalTopicNavigationProps {
  level: GrammarLevel;
  section?: 'get-started' | 'grammar-items' | 'board-questions';
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  showProgress?: boolean;
  className?: string;
}

interface TopicStats {
  ruleCount: number;
  questionCount: number;
  completionRate?: number;
  averageScore?: number;
  lastAccessed?: Date;
}

interface FilterOptions {
  difficulty: 'ALL' | 'EASY' | 'MEDIUM' | 'HARD';
  category: 'ALL' | 'grammar-rules' | 'questions' | 'both';
  sortBy: 'order' | 'name' | 'difficulty' | 'rules' | 'questions';
  sortOrder: 'asc' | 'desc';
}



const getTopicStats = (topicSlug: string): TopicStats => {
  const grammarData = grammarRulesData[topicSlug as keyof typeof grammarRulesData];
  const questionData = questionsData[topicSlug as keyof typeof questionsData];
  
  return {
    ruleCount: grammarData?.rules?.length || 0,
    questionCount: questionData?.questions?.length || 0,
    completionRate: Math.floor(Math.random() * 100), // Mock data - would come from user progress
    averageScore: Math.floor(Math.random() * 40) + 60, // Mock data - would come from user performance
    lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Mock data
  };
};

const TopicCard = ({ 
  topic, 
  stats, 
  section = 'get-started'
}: { 
  topic: TopicConfig; 
  stats: TopicStats;
  section?: string;
}) => {
  const pathname = usePathname();
  
  // Determine the correct route based on section
  const getTopicRoute = () => {
    switch (section) {
      case 'grammar-items':
        return topic.routes.grammarRules || `/grammar-items/${topic.level.toLowerCase()}/${topic.slug}`;
      case 'board-questions':
        return topic.routes.questions || `/board-questions/${topic.level.toLowerCase()}/${topic.slug}`;
      case 'get-started':
      default:
        return topic.routes.practice || `/get-started/${topic.slug}`;
    }
  };

  const route = getTopicRoute();
  const isActive = pathname === route;

  return (
    <Link href={route}>
      <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/10 hover:border-sf-button/50 cursor-pointer border-sf-text-muted/20 ${
        isActive ? 'ring-2 ring-sf-button/50 border-sf-button/50' : ''
      }`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="text-3xl" style={{ color: topic.color }}>
              {topic.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-sf-text-bold leading-tight mb-2">
                {topic.name}
              </CardTitle>
              {/* Hide question count for grammar-items section */}
              {section !== 'grammar-items' && (
                <div className="text-sm text-sf-text-subtle">
                  {stats.questionCount} Questions
                </div>
              )}
            </div>
            {isActive && (
              <CheckCircle className="h-5 w-5 text-sf-button" data-testid="check-circle" />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function UniversalTopicNavigation({
  level,
  section = 'get-started',
  showSearch = true,
  showFilters = true,
  showStats = true,
  showProgress = false,
  className = ''
}: UniversalTopicNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: 'ALL',
    category: 'ALL',
    sortBy: 'order',
    sortOrder: 'asc'
  });
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Get topics based on level
  const allTopics = useMemo(() => {
    return getActiveTopics(level);
  }, [level]);

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    let topics = [...allTopics];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      topics = topics.filter(topic => 
        topic.name.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply difficulty filter
    if (filters.difficulty !== 'ALL') {
      topics = topics.filter(topic => topic.difficulty === filters.difficulty);
    }

    // Apply category filter
    if (filters.category !== 'ALL') {
      topics = topics.filter(topic => 
        topic.category === filters.category || topic.category === 'both'
      );
    }

    // Apply sorting
    topics.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'difficulty':
          const difficultyOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case 'rules':
          const aRules = getTopicStats(a.slug).ruleCount;
          const bRules = getTopicStats(b.slug).ruleCount;
          comparison = aRules - bRules;
          break;
        case 'questions':
          const aQuestions = getTopicStats(a.slug).questionCount;
          const bQuestions = getTopicStats(b.slug).questionCount;
          comparison = aQuestions - bQuestions;
          break;
        case 'order':
        default:
          comparison = a.order - b.order;
          break;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return topics;
  }, [allTopics, searchQuery, filters]);



  const getSectionTitle = () => {
    switch (section) {
      case 'grammar-items':
        return 'Grammar Rules & Concepts';
      case 'board-questions':
        return 'Board Questions & Practice';
      case 'get-started':
      default:
        return 'Get Started with Learning';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'grammar-items':
        return 'Explore comprehensive grammar rules, structures, and examples for each topic';
      case 'board-questions':
        return 'Practice with real board questions from previous years and mock tests';
      case 'get-started':
      default:
        return 'Begin your learning journey with interactive lessons and practice exercises';
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Enhanced Header Section - Prominently displayed at top */}
      <div className="space-y-8 bg-gradient-to-br from-sf-bg via-sf-bg/98 to-sf-bg/95 p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl border border-sf-text-muted/10 shadow-2xl">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-sf-text-bold leading-tight tracking-tight">
            {level} {getSectionTitle()}
          </h1>
          <p className="text-sf-text-subtle text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed font-light">
            {getSectionDescription()}
          </p>
        </div>

        {/* Prominent Statistics Display */}
        {showStats && (
          <div className={`grid grid-cols-1 ${section === 'grammar-items' ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-6 sm:gap-8 max-w-6xl mx-auto`}>
            <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-sf-button/10 to-sf-button/5 border-sf-button/30 hover:bg-sf-button/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="space-y-3 sm:space-y-4">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-sf-button mx-auto" />
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-sf-text-bold">9</div>
                <div className="text-lg sm:text-xl text-sf-text-muted font-semibold">Topics</div>
              </div>
            </Card>
            <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-sf-button/10 to-sf-button/5 border-sf-button/30 hover:bg-sf-button/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="space-y-3 sm:space-y-4">
                <Target className="h-10 w-10 sm:h-12 sm:w-12 text-sf-button mx-auto" />
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-sf-text-bold">112</div>
                <div className="text-lg sm:text-xl text-sf-text-muted font-semibold">Rules</div>
              </div>
            </Card>
            {/* Hide Questions card for grammar-items section */}
            {section !== 'grammar-items' && (
              <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-sf-button/10 to-sf-button/5 border-sf-button/30 hover:bg-sf-button/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="space-y-3 sm:space-y-4">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-sf-button mx-auto" />
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-sf-text-bold">74</div>
                  <div className="text-lg sm:text-xl text-sf-text-muted font-semibold">Questions</div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="space-y-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sf-text-muted" />
              <Input
                placeholder="Search topics, descriptions, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {showFilters && (
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>

              {showFiltersPanel && (
                <div className="flex flex-wrap items-center gap-3">
                  <Select
                    value={filters.difficulty}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value as FilterOptions['difficulty'] }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Levels</SelectItem>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, category: value as FilterOptions['category'] }))}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Categories</SelectItem>
                      <SelectItem value="grammar-rules">Grammar Rules</SelectItem>
                      <SelectItem value="questions">Questions</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as FilterOptions['sortBy'] }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Default</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                      <SelectItem value="rules">Rules Count</SelectItem>
                      <SelectItem value="questions">Questions Count</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
                    }))}
                  >
                    {filters.sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            stats={getTopicStats(topic.slug)}
            section={section}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="text-sf-text-muted mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No topics found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setFilters({
                difficulty: 'ALL',
                category: 'ALL',
                sortBy: 'order',
                sortOrder: 'asc'
              });
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}