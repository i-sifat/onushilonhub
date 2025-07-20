'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { transformationQuestions } from '@/data/questions/transformation';

const boards = ['All Boards', 'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Barisal', 'Cumilla', 'Mymensingh', 'Jashore', 'Dinajpur', 'Rangpur'];
const years = ['All Years', '2016', '2017', '2018', '2019'];
const categories = [
  'All Categories', 
  'Simple', 
  'Complex', 
  'Compound',
  'Positive',
  'Comparative', 
  'Superlative',
  'Active',
  'Passive',
  'Affirmative',
  'Negative',
  'Assertive',
  'Interrogative',
  'Exclamatory',
  'Imperative'
];

export default function TransformationQuestionsPage() {
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

  const filteredTransformations = useMemo(() => {
    return allTransformations.filter(transformation => {
      const matchesSearch = !searchTerm || 
        (transformation.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         transformation.transformedSentence?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      const matchesBoard = selectedBoard === 'All Boards' || transformation.board?.toLowerCase().includes(selectedBoard.toLowerCase()) || false;
      const matchesYear = selectedYear === 'All Years' || transformation.year?.toString() === selectedYear || false;
      const matchesCategory = selectedCategory === 'All Categories' || transformation.transformationType === selectedCategory;
      
      return matchesSearch && matchesBoard && matchesYear && matchesCategory;
    });
  }, [allTransformations, searchTerm, selectedBoard, selectedYear, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
    setSelectedCategory('All Categories');
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years' || selectedCategory !== 'All Categories';

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
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

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-sf-button" />
            <h3 className="text-lg font-semibold text-sf-text-bold">Filter Questions</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Search Questions
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sf-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in questions..."
                className="w-full pl-10 pr-4 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Type
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Board Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Board
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-sf-text-subtle mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-sf-text-muted">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory !== 'All Categories' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Type: {selectedCategory}
                </Badge>
              )}
              {selectedBoard !== 'All Boards' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Board: {selectedBoard}
                </Badge>
              )}
              {selectedYear !== 'All Years' && (
                <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                  Year: {selectedYear}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-sf-text-bold">
          {filteredTransformations.length} Question{filteredTransformations.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-sf-text-muted">
          HSC Transformation
        </div>
      </div>

      {/* Questions List */}
      {filteredTransformations.length === 0 ? (
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Questions Found</h3>
            <p className="text-sf-text-subtle">
              {hasActiveFilters 
                ? "No questions match your current filters. Try adjusting your search criteria."
                : "No questions available at the moment."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTransformations.map((transformation, index) => (
            <Card 
              key={`${transformation.questionId}-${transformation.transformationIndex}`}
              className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-sf-button border-sf-button/30">
                      Question {index + 1}
                    </Badge>
                    <Badge variant="outline" className={getCategoryBadgeColor(transformation.transformationType)}>
                      {transformation.transformationType}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-sf-text-muted">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{transformation.board}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{transformation.year}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-sf-highlight/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h5 className="text-sm font-semibold text-sf-text-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Original Sentence
                      </h5>
                      <p className="text-sf-text-subtle text-sm leading-relaxed">
                        {transformation.question}
                      </p>
                    </div>
                    
                    <div className="bg-sf-highlight/10 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h5 className="text-sm font-semibold text-sf-text-bold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Transformed ({transformation.transformationType})
                      </h5>
                      <p className="text-sf-text-subtle text-sm leading-relaxed">
                        {transformation.transformedSentence}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center pt-2">
                    <ArrowRight className="h-4 w-4 text-sf-button" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}