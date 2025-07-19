'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { narrationRules } from '@/data/grammar-rules/narration';
import { narrationQuestions } from '@/data/questions/narration';
import { Search, Filter, Calendar, MapPin, BookOpen, RotateCcw, ArrowRightLeft } from 'lucide-react';

const boards = ['All Boards', 'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Barisal', 'Cumilla', 'Mymensingh', 'Jashore', 'Dinajpur', 'Rangpur'];
const years = ['All Years', '2022', '2023', '2024'];
const types = ['All Types', 'direct-to-indirect', 'indirect-to-direct'];

export default function NarrationCombinedPage() {
  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedType, setSelectedType] = useState('All Types');

  // Filter questions based on selected rule and other filters
  const filteredQuestions = narrationQuestions.filter(question => {
    const matchesRule = selectedRuleId === null || question.ruleId === selectedRuleId;
    const matchesSearch = !searchTerm || 
      (question.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       question.directSpeech?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       question.indirectSpeech?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesBoard = selectedBoard === 'All Boards' || question.id?.toLowerCase().includes(selectedBoard.toLowerCase()) || false;
    const matchesYear = selectedYear === 'All Years' || question.id?.includes(selectedYear) || false;
    const matchesType = selectedType === 'All Types' || question.type === selectedType;
    
    return matchesRule && matchesSearch && matchesBoard && matchesYear && matchesType;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
    setSelectedType('All Types');
    setSelectedRuleId(null);
  };

  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years' || selectedType !== 'All Types' || selectedRuleId !== null;

  const getQuestionMetadata = (questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
      year: parts[1],
      questionNumber: parts[2]
    };
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'direct-to-indirect':
        return 'Direct → Indirect';
      case 'indirect-to-direct':
        return 'Indirect → Direct';
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'direct-to-indirect':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'indirect-to-direct':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      default:
        return 'bg-sf-highlight/20 text-sf-text-bold';
    }
  };

  const selectedRule = selectedRuleId ? narrationRules.find(rule => rule.id === selectedRuleId) : null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Side - Grammar Rules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-sf-text-bold">Grammar Rules</h2>
          <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
            {narrationRules.length} Rules
          </Badge>
        </div>

        <div className="space-y-4 max-h-[80vh] overflow-y-auto">
          {narrationRules.map((rule) => (
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
                <Badge variant="outline" className="text-sf-button border-sf-button/30">
                  {rule.ruleNo}
                </Badge>
                {selectedRuleId === rule.id && (
                  <Badge variant="secondary" className="bg-sf-button text-sf-bg">
                    Selected
                  </Badge>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-sf-text-bold mb-2 leading-relaxed">
                {rule.title}
              </h3>
              
              <p className="text-sf-text-muted text-xs mb-1">
                Bengali: {rule.bengali}
              </p>
              
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2 py-1 text-xs border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'All Types' ? type : getTypeLabel(type)}
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
              Practice Questions ({filteredQuestions.length})
            </h4>
            {selectedRuleId && (
              <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
                Rule {selectedRuleId} Questions
              </Badge>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto space-y-3">
            {filteredQuestions.length === 0 ? (
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
              filteredQuestions.map((question, index) => {
                const metadata = getQuestionMetadata(question.id);
                
                return (
                  <Card 
                    key={question.id} 
                    className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                            Q{index + 1}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(question.type)}`}>
                            {getTypeLabel(question.type)}
                          </Badge>
                          {question.ruleId && (
                            <Badge variant="secondary" className="bg-sf-highlight/20 text-sf-text-bold text-xs">
                              Rule {question.ruleId}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-sf-text-muted">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{metadata.board}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{metadata.year}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-sf-text-subtle text-sm leading-relaxed">
                          <span className="font-medium">Question:</span> {question.question}
                        </p>
                        
                        <div className="grid grid-cols-1 gap-2">
                          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-2 rounded-r-lg">
                            <p className="text-xs font-medium text-blue-400 mb-1">Direct Speech:</p>
                            <p className="text-sf-text-subtle text-xs leading-relaxed">
                              {question.directSpeech}
                            </p>
                          </div>
                          
                          <div className="flex justify-center">
                            <ArrowRightLeft className="h-3 w-3 text-sf-button" />
                          </div>
                          
                          <div className="bg-green-500/10 border-l-4 border-green-500 p-2 rounded-r-lg">
                            <p className="text-xs font-medium text-green-400 mb-1">Indirect Speech:</p>
                            <p className="text-sf-text-subtle text-xs leading-relaxed">
                              {question.indirectSpeech}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}