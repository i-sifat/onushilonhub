'use client';

import { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  BookOpen, 
  RotateCcw, 
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import { ViewModeToggle, ViewMode } from '@/components/ui/view-mode-toggle';
import { ContentBox } from '@/components/ui/content-box';
import { GrammarRuleDisplay } from '@/components/grammar/GrammarRuleDisplay';
import { TopicIntroduction } from '@/components/grammar/TopicIntroduction';
import { GrammarRule, GrammarTopicSlug } from '@/types/grammar.types';

interface UniversalGrammarUIProps {
  topic: string;
  topicSlug: GrammarTopicSlug;
  rules: GrammarRule[];
  level?: 'HSC' | 'SSC';
  showSearch?: boolean;
  showFilters?: boolean;
  topicIntroduction?: {
    title: string;
    banglaDescription: string;
    types?: {
      title: string;
      description: string;
      list: string[];
    };
  };
}

interface FilterState {
  searchTerm: string;
}

export default function UniversalGrammarUI({ 
  topic, 
  topicSlug, 
  rules, 
  level = 'HSC',
  showSearch = true,
  showFilters = true,
  topicIntroduction
}: UniversalGrammarUIProps) {
  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const [expandedRules, setExpandedRules] = useState<{[key: string]: boolean}>({});
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [copiedRules, setCopiedRules] = useState<{[key: string]: boolean}>({});
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: ''
  });

  // Update filter state
  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);



  // Filter rules based on criteria
  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      // Search filter
      const matchesSearch = !filters.searchTerm || 
        rule.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        rule.description?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        rule.bengali?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (rule as any).banglaDescription?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        rule.structures?.some(s => s.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        rule.examples?.some(e => e.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      return matchesSearch;
    });
  }, [rules, filters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: ''
    });
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm;
  }, [filters]);

  // Toggle rule expansion
  const toggleRuleExpansion = useCallback((ruleId: number) => {
    setExpandedRules(prev => ({
      ...prev,
      [ruleId]: !prev[ruleId]
    }));
  }, []);

  // Copy rule content to clipboard
  const copyRuleContent = useCallback(async (rule: GrammarRule) => {
    const content = `
${rule.title}
${rule.bengali ? `Bengali: ${rule.bengali}` : ''}
Description: ${rule.description}

${rule.structures?.length ? `Structures:
${rule.structures.map(s => `• ${s}`).join('\n')}` : ''}

Examples:
${rule.examples.map(e => `• ${e}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(content);
      setCopiedRules(prev => ({ ...prev, [rule.id]: true }));
      setTimeout(() => {
        setCopiedRules(prev => ({ ...prev, [rule.id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy rule content:', err);
    }
  }, []);

  // Get selected rule
  const selectedRule = useMemo(() => {
    return selectedRuleId ? rules.find(rule => rule.id === selectedRuleId) : null;
  }, [selectedRuleId, rules]);

  return (
    <div className="space-y-6">
      {/* Topic Introduction */}
      {topicIntroduction && (
        <TopicIntroduction
          title={topicIntroduction.title}
          banglaDescription={topicIntroduction.banglaDescription}
          types={topicIntroduction.types}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sf-text-bold">{topic} Grammar Rules</h1>
          <p className="text-sf-text-muted">
            {filteredRules.length} of {rules.length} rules • {level} Level
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
            Grammar Only
          </Badge>
          <ViewModeToggle 
            viewMode={viewMode} 
            onViewModeChange={setViewMode}
          />
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-sf-button" />
              <h4 className="text-md font-semibold text-sf-text-bold">Filter Rules</h4>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sf-text-muted hover:text-sf-button"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-sf-text-muted" />
                <input
                  type="text"
                  value={filters.searchTerm}
                  onChange={(e) => updateFilter('searchTerm', e.target.value)}
                  placeholder="Search rules..."
                  className="w-full pl-6 pr-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Left Column (1/4) - Rules List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-sf-text-bold">Rules</h2>
            <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
              {filteredRules.length}
            </Badge>
          </div>

          <div className="space-y-3 max-h-[80vh] overflow-y-auto">
            {filteredRules.map((rule) => {
              const isExpanded = expandedRules[rule.id];
              
              return (
                <div
                  key={rule.id}
                  className={`border rounded-lg transition-all duration-300 ${
                    selectedRuleId === rule.id
                      ? 'border-sf-button bg-sf-button/10'
                      : 'border-sf-text-muted/20 hover:border-sf-button/50'
                  }`}
                >
                  <div
                    onClick={() => setSelectedRuleId(selectedRuleId === rule.id ? null : rule.id)}
                    className="cursor-pointer p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                        {rule.ruleNo || `Rule ${rule.id}`}
                      </Badge>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-sf-text-bold mb-2 leading-tight">
                      {rule.title}
                    </h3>
                  </div>

                  {selectedRuleId === rule.id && (
                    <div className="border-t border-sf-button/20 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRuleExpansion(rule.id)}
                          className="text-xs"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-3 w-3 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              Show Details
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyRuleContent(rule)}
                          className="text-xs"
                        >
                          {copiedRules[rule.id] ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {isExpanded && (
                        <div className="space-y-2">
                          {rule.structures && rule.structures.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-sf-text-bold mb-1">Structures:</p>
                              <div className="space-y-1">
                                {rule.structures.slice(0, 2).map((structure, index) => (
                                  <p key={index} className="text-xs text-sf-text-muted font-mono">
                                    {structure}
                                  </p>
                                ))}
                                {rule.structures.length > 2 && (
                                  <p className="text-xs text-sf-text-muted">
                                    +{rule.structures.length - 2} more...
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <p className="text-xs font-medium text-sf-text-bold mb-1">Examples:</p>
                            <div className="space-y-1">
                              {rule.examples.slice(0, 2).map((example, index) => (
                                <p key={index} className="text-xs text-sf-text-muted">
                                  {example}
                                </p>
                              ))}
                              {rule.examples.length > 2 && (
                                <p className="text-xs text-sf-text-muted">
                                  +{rule.examples.length - 2} more...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 3 Columns (3/4) - Rule Details */}
        <div className="col-span-3">
          {selectedRule ? (
            <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-sf-button border-sf-button/30">
                    {selectedRule.ruleNo || `Rule ${selectedRule.id}`}
                  </Badge>
                  <h3 className="text-xl font-bold text-sf-text-bold">Rule Details</h3>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyRuleContent(selectedRule)}
                  className="text-xs"
                >
                  {copiedRules[selectedRule.id] ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Rule
                    </>
                  )}
                </Button>
              </div>
              
              <GrammarRuleDisplay
                title={selectedRule.title}
                banglaDescription={(selectedRule as any).banglaDescription || selectedRule.bengali || selectedRule.description || ''}
                examples={selectedRule.examples}
              />
            </div>
          ) : (
            <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 text-center">
              <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
                Select a Rule
              </h3>
              <p className="text-sf-text-subtle">
                Click on any rule from the left to see its detailed explanation, structures, and examples.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid View for Rules (when not using sidebar) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredRules.map((rule) => {
            return (
              <Card 
                key={rule.id}
                className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                      {rule.ruleNo || `Rule ${rule.id}`}
                    </Badge>
                  </div>
                  
                  <h3 className="text-md font-semibold text-sf-text-bold mb-2 leading-tight">
                    {rule.title}
                  </h3>
                  
                  <div className="flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyRuleContent(rule)}
                      className="text-xs"
                    >
                      {copiedRules[rule.id] ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}