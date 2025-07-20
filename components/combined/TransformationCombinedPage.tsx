'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { transformationRules } from '@/data/grammar-rules/transformation';
import { transformationQuestions } from '@/data/questions/transformation';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, ArrowRight } from 'lucide-react';

const boards = ['All Boards', 'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Barisal', 'Cumilla', 'Mymensingh', 'Jashore', 'Dinajpur', 'Rangpur'];
const years = ['All Years', '2016', '2017', '2018', '2019'];
const categories = [
  'All Categories', 
  'simple-complex-compound', 
  'affirmative-negative', 
  'assertive-interrogative', 
  'assertive-exclamatory', 
  'assertive-imperative', 
  'degree'
];

export default function TransformationCombinedPage() {
  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Flatten all transformations from all questions
  const allTransformations = useMemo(() => {
    const transformations: any[] = [];
    transformationQuestions.forEach(question => {
      question.transformations.forEach((transformation, index) => {
        transformations.push({
          ...transformation,
          questionId: question.id,
          board: question.board,
          year: question.year,
          instruction: question.instruction,
          transformationIndex: index
        });
      });
    });
    return transformations;
  }, []);

  // Get question count for each rule
  const getRuleQuestionCount = (ruleId: number) => {
    return allTransformations.filter(t => {
      // For transformation, we'll match based on transformation type patterns
      const rule = transformationRules.find(r => r.id === ruleId);
      if (!rule) return false;
      
      // Match based on category and transformation type
      switch (rule.category) {
        case 'simple-complex-compound':
          return ['Simple', 'Complex', 'Compound'].includes(t.transformationType);
        case 'affirmative-negative':
          return ['Negative', 'Affirmative'].includes(t.transformationType);
        case 'assertive-interrogative':
          return ['Interrogative'].includes(t.transformationType);
        case 'assertive-exclamatory':
          return ['Exclamatory'].includes(t.transformationType);
        case 'assertive-imperative':
          return ['Imperative'].includes(t.transformationType);
        case 'degree':
          return ['Positive', 'Comparative', 'Superlative'].includes(t.transformationType);
        default:
          return false;
      }
    }).length;
  };

  // Filter rules based on category
  const filteredRules = transformationRules.filter(rule => {
    return selectedCategory === 'All Categories' || rule.category === selectedCategory;
  });

  // Filter questions based on selected rule and other filters
  const filteredTransformations = allTransformations.filter(transformation => {
    const matchesRule = selectedRuleId === null || (() => {
      const rule = transformationRules.find(r => r.id === selectedRuleId);
      if (!rule) return false;
      
      switch (rule.category) {
        case 'simple-complex-compound':
          return ['Simple', 'Complex', 'Compound'].includes(transformation.transformationType);
        case 'affirmative-negative':
          return ['Negative', 'Affirmative'].includes(transformation.transformationType);
        case 'assertive-interrogative':
          return ['Interrogative'].includes(transformation.transformationType);
        case 'assertive-exclamatory':
          return ['Exclamatory'].includes(transformation.transformationType);
        case 'assertive-imperative':
          return ['Imperative'].includes(transformation.transformationType);
        case 'degree':
          return ['Positive', 'Comparative', 'Superlative'].includes(transformation.transformationType);
        default:
          return false;
      }
    })();
    
    const matchesSearch = !searchTerm || 
      (transformation.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       transformation.transformedSentence?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesBoard = selectedBoard === 'All Boards' || transformation.board?.toLowerCase().includes(selectedBoard.toLowerCase()) || false;
    const matchesYear = selectedYear === 'All Years' || transformation.year?.toString() === selectedYear || false;
    const matchesCategory = selectedCategory === 'All Categories' || (() => {
      const rule = transformationRules.find(r => r.id === selectedRuleId);
      return rule ? rule.category === selectedCategory : true;
    })();
    
    return matchesRule && matchesSearch && matchesBoard && matchesYear && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
    setSelectedCategory('All Categories');
    setSelectedRuleId(null);
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years' || selectedCategory !== 'All Categories' || selectedRuleId !== null;

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'simple-complex-compound':
        return 'Simple-Complex-Compound';
      case 'affirmative-negative':
        return 'Affirmative-Negative';
      case 'assertive-interrogative':
        return 'Assertive-Interrogative';
      case 'assertive-exclamatory':
        return 'Assertive-Exclamatory';
      case 'assertive-imperative':
        return 'Assertive-Imperative';
      case 'degree':
        return 'Degree';
      default:
        return category;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'simple-complex-compound':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'affirmative-negative':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'assertive-interrogative':
        return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      case 'assertive-exclamatory':
        return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
      case 'assertive-imperative':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'degree':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      default:
        return 'bg-sf-highlight/20 text-sf-text-bold';
    }
  };

  const getTransformationTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Simple':
      case 'Complex':
      case 'Compound':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'Positive':
      case 'Comparative':
      case 'Superlative':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'Active':
      case 'Passive':
        return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      case 'Affirmative':
      case 'Negative':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'Assertive':
      case 'Interrogative':
      case 'Exclamatory':
      case 'Imperative':
        return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
      default:
        return 'bg-sf-highlight/20 text-sf-text-bold';
    }
  };

  const selectedRule = selectedRuleId ? transformationRules.find(rule => rule.id === selectedRuleId) : null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Side - Grammar Rules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-sf-text-bold">Grammar Rules</h2>
          <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
            {filteredRules.length} Rules
          </Badge>
        </div>

        {/* Category Filter for Rules */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'All Categories' ? category : getCategoryLabel(category)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {filteredRules.map((rule) => {
            const questionCount = getRuleQuestionCount(rule.id);
            
            return (
              <div
                key={rule.id}
                onClick={() => setSelectedRuleId(selectedRuleId === rule.id ? null : rule.id)}
                className={`cursor-pointer border rounded-lg p-4 transition-all duration-300 ${
                  selectedRuleId === rule.id
                    ? 'border-sf-button bg-sf-button/10'
                    : 'border-sf-text-muted/20 hover:border-sf-button/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-sf-button border-sf-button/30">
                      {rule.ruleNo}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getCategoryBadgeColor(rule.category)}`}>
                      {getCategoryLabel(rule.category)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {questionCount > 0 && (
                      <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold text-xs">
                        {questionCount} questions
                      </Badge>
                    )}
                    {selectedRuleId === rule.id && (
                      <Badge variant="secondary" className="bg-sf-button text-sf-bg">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-sf-text-bold mb-2 leading-relaxed">
                  {rule.title}
                </h3>
                
                <p className="text-sf-text-muted text-xs mb-1">
                  Bengali: {rule.bengali}
                </p>
                
                <p className="text-sf-text-subtle text-sm leading-relaxed">
                  {rule.description.length > 100 ? `${rule.description.substring(0, 100)}...` : rule.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side - Rule Details and Questions */}
      <div className="space-y-6">
        {/* Rule Details */}
        {selectedRule ? (
          <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="outline" className="text-sf-button border-sf-button/30">
                {selectedRule.ruleNo}
              </Badge>
              <Badge variant="outline" className={getCategoryBadgeColor(selectedRule.category)}>
                {getCategoryLabel(selectedRule.category)}
              </Badge>
              <h3 className="text-xl font-bold text-sf-text-bold">Rule Details</h3>
            </div>
            
            <h4 className="text-lg font-semibold text-sf-text-bold mb-3 leading-relaxed">
              {selectedRule.title}
            </h4>
            
            <p className="text-sf-text-muted mb-2 text-sm">
              <span className="font-medium">Bengali:</span> {selectedRule.bengali}
            </p>
            
            <p className="text-sf-text-subtle mb-4 leading-relaxed">
              <span className="font-medium">Usage:</span> {selectedRule.description}
            </p>

            <div className="mb-4">
              <h5 className="text-md font-semibold text-sf-text-bold mb-2">Structures:</h5>
              <div className="space-y-2">
                {selectedRule.structures.map((structure, index) => (
                  <div
                    key={index}
                    className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg"
                  >
                    <p className="text-sf-text-subtle text-sm font-mono leading-relaxed">
                      {structure}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-md font-semibold text-sf-text-bold mb-3">Examples:</h5>
              <div className="space-y-2">
                {selectedRule.examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-sf-highlight/10 border-l-4 border-sf-button p-3 rounded-r-lg"
                  >
                    <p className="text-sf-text-subtle text-sm leading-relaxed">
                      {example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 text-center">
            <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
              Select a Rule
            </h3>
            <p className="text-sf-text-subtle">
              Click on any rule from the left to see its details and related questions.
            </p>
          </div>
        )}

        {/* Questions Filter */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-sf-button" />
              <h4 className="text-md font-semibold text-sf-text-bold">Filter Questions</h4>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-xs"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-sf-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-6 pr-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All Categories' ? category : getCategoryLabel(category)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-sf-text-bold">
              Practice Questions ({filteredTransformations.length})
            </h4>
            {selectedRuleId && (
              <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
                Rule {selectedRuleId} Questions
              </Badge>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto space-y-3">
            {filteredTransformations.length === 0 ? (
              <Card className="border-sf-text-muted/20">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-sf-text-muted mx-auto mb-2" />
                  <h5 className="text-md font-semibold text-sf-text-bold mb-1">No Questions Found</h5>
                  <p className="text-sf-text-subtle text-sm">
                    {selectedRuleId 
                      ? `No questions available for Rule ${selectedRuleId} with current filters.`
                      : "Select a rule or adjust filters to see questions."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTransformations.map((transformation, index) => (
                <Card 
                  key={`${transformation.questionId}-${transformation.transformationIndex}`}
                  className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                          Q{index + 1}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getTransformationTypeBadgeColor(transformation.transformationType)}`}>
                          {transformation.transformationType}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-sf-text-muted">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{transformation.board}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{transformation.year}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-2 rounded-r-lg">
                          <p className="text-xs font-medium text-blue-400 mb-1">Original:</p>
                          <p className="text-sf-text-subtle text-xs leading-relaxed">
                            {transformation.question}
                          </p>
                        </div>
                        
                        <div className="flex justify-center">
                          <ArrowRight className="h-3 w-3 text-sf-button" />
                        </div>
                        
                        <div className="bg-green-500/10 border-l-4 border-green-500 p-2 rounded-r-lg">
                          <p className="text-xs font-medium text-green-400 mb-1">Transformed ({transformation.transformationType}):</p>
                          <p className="text-sf-text-subtle text-xs leading-relaxed">
                            {transformation.transformedSentence}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}