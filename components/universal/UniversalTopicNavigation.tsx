'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Search, 
  Filter,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { TopicConfig, getTopicsByLevel, getActiveTopics } from '@/data/topics';
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

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY': return 'bg-green-100 text-green-800 border-green-200';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'HARD': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

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
  section = 'get-started',
  showProgress = false,
  showStats = false 
}: { 
  topic: TopicConfig; 
  stats: TopicStats;
  section?: string;
  showProgress?: boolean;
  showStats?: boolean;
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
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl" style={{ color: topic.color }}>
                {topic.icon}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg text-sf-text-bold leading-tight">
                  {topic.name}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getDifficultyColor(topic.difficulty)}`}
                  >
                    {topic.difficulty}
                  </Badge>
                  {topic.estimatedTime && (
                    <div className="flex items-center text-xs text-sf-text-muted">
                      <Clock className="h-3 w-3 mr-1" />
                      {topic.estimatedTime}m
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isActive && (
              <CheckCircle className="h-5 w-5 text-sf-button" data-testid="check-circle" />
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-sf-text-subtle leading-relaxed">
            {topic.description}
          </p>
          
          {/* Statistics */}
          {showStats && (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-sf-button" />
                <div className="text-xs">
                  <div className="font-medium text-sf-text-bold">{stats.ruleCount}</div>
                  <div className="text-sf-text-muted">Rules</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-sf-button" />
                <div className="text-xs">
                  <div className="font-medium text-sf-text-bold">{stats.questionCount}</div>
                  <div className="text-sf-text-muted">Questions</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Progress Indicators */}
          {showProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sf-text-muted">Progress</span>
                <span className="font-medium text-sf-text-bold">{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-sf-text-muted/20 rounded-full h-2">
                <div 
                  className="bg-sf-button h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
              {stats.averageScore && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sf-text-muted">Avg. Score</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="font-medium text-sf-text-bold">{stats.averageScore}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Tags */}
          {topic.tags && topic.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {topic.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs bg-sf-button/10 text-sf-button border-sf-button/20"
                >
                  {tag}
                </Badge>
              ))}
              {topic.tags.length > 3 && (
                <Badge variant="outline" className="text-xs text-sf-text-muted">
                  +{topic.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Prerequisites */}
          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-sf-text-muted">
              <AlertCircle className="h-3 w-3" />
              <span>Requires: {topic.prerequisites.join(', ')}</span>
            </div>
          )}
          
          {/* Last accessed */}
          {showProgress && stats.lastAccessed && (
            <div className="text-xs text-sf-text-muted">
              Last accessed: {stats.lastAccessed.toLocaleDateString()}
            </div>
          )}
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

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    const totalRules = filteredTopics.reduce((sum, topic) => 
      sum + getTopicStats(topic.slug).ruleCount, 0
    );
    const totalQuestions = filteredTopics.reduce((sum, topic) => 
      sum + getTopicStats(topic.slug).questionCount, 0
    );
    const avgCompletion = Math.round(
      filteredTopics.reduce((sum, topic) => 
        sum + (getTopicStats(topic.slug).completionRate || 0), 0
      ) / filteredTopics.length
    );

    return { totalRules, totalQuestions, avgCompletion };
  }, [filteredTopics]);

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
    <div className={`space-y-6 ${className}`}>
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-sf-text-bold mb-2">
            {level} {getSectionTitle()}
          </h1>
          <p className="text-sf-text-subtle text-lg">
            {getSectionDescription()}
          </p>
        </div>

        {/* Overall Statistics */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-sf-button" />
                <div>
                  <div className="text-2xl font-bold text-sf-text-bold">{filteredTopics.length}</div>
                  <div className="text-sm text-sf-text-muted">Topics</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-sf-button" />
                <div>
                  <div className="text-2xl font-bold text-sf-text-bold">{overallStats.totalRules}</div>
                  <div className="text-sm text-sf-text-muted">Rules</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-sf-button" />
                <div>
                  <div className="text-2xl font-bold text-sf-text-bold">{overallStats.totalQuestions}</div>
                  <div className="text-sm text-sf-text-muted">Questions</div>
                </div>
              </div>
            </Card>
            {showProgress && (
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-sf-button" />
                  <div>
                    <div className="text-2xl font-bold text-sf-text-bold">{overallStats.avgCompletion}%</div>
                    <div className="text-sm text-sf-text-muted">Progress</div>
                  </div>
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
            showProgress={showProgress}
            showStats={showStats}
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