'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { transformationRules } from '@/data/grammar-rules/transformation';

export default function TransformationGrammarRules() {
  // Group rules by category
  const rulesByCategory = transformationRules.reduce((acc, rule) => {
    if (!acc[rule.category]) {
      acc[rule.category] = [];
    }
    acc[rule.category].push(rule);
    return acc;
  }, {} as Record<string, typeof transformationRules>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'simple-complex-compound':
        return 'Simple – Complex – Compound';
      case 'affirmative-negative':
        return 'Affirmative – Negative';
      case 'assertive-interrogative':
        return 'Assertive – Interrogative';
      case 'assertive-exclamatory':
        return 'Assertive – Exclamatory';
      case 'assertive-imperative':
        return 'Assertive – Imperative';
      case 'degree':
        return 'Degree (Positive – Comparative – Superlative)';
      default:
        return category;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'simple-complex-compound':
        return 'Transform sentences between simple (single clause), complex (subordinating conjunction), and compound (coordinating conjunction) structures.';
      case 'affirmative-negative':
        return 'Transform affirmative sentences to negative while maintaining the same meaning.';
      case 'assertive-interrogative':
        return 'Transform assertive (statement) sentences to interrogative (question) sentences.';
      case 'assertive-exclamatory':
        return 'Transform assertive sentences to exclamatory sentences expressing strong emotion.';
      case 'assertive-imperative':
        return 'Transform assertive sentences to imperative (command) sentences.';
      case 'degree':
        return 'Transform sentences between positive, comparative, and superlative degrees of adjectives.';
      default:
        return '';
    }
  };

  // Transformation overview table data
  const transformationOverview = [
    { type: 'Simple', description: 'Single clause, 1 subject, 1 finite verb', example: 'He admitted his guilt' },
    { type: 'Complex', description: 'More than one clause, subordinating conjunction', example: 'He admitted that he is guilty' },
    { type: 'Compound', description: '1 main clause, one or more coordinated clauses', example: 'He is guilty and he admitted that' }
  ];

  const degreeTable = [
    { degree: 'Positive', example: 'Tall, Good, Popular, Useful' },
    { degree: 'Comparative', example: 'Taller, Better, More popular, More useful' },
    { degree: 'Superlative', example: 'Tallest, Best, Most popular, Most useful' }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Transformation কাকে বলে?</h2>
        <div className="space-y-4 text-sf-text-subtle leading-relaxed">
          <p>
            Transformation হলো একটি বাক্যকে অর্থ পরিবর্তন না করে অন্য ধরনের বাক্যে রূপান্তরিত করা। 
            এটি ইংরেজি ব্যাকরণের একটি গুরুত্বপূর্ণ অংশ যা বাক্যের গঠন ও প্রকার পরিবর্তন করে।
          </p>
          <p className="font-medium text-sf-text-bold">
            মূল অর্থ অপরিবর্তিত রেখে বাক্যের গঠন ও ধরন পরিবর্তন করাকে Transformation বলে।
          </p>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Categories of Transformation</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">Structure Based</h3>
            <p className="text-sf-text-subtle text-sm">Simple – Complex – Compound</p>
          </div>
          <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">Meaning Based</h3>
            <p className="text-sf-text-subtle text-sm">Affirmative – Negative</p>
          </div>
          <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">Type Based</h3>
            <p className="text-sf-text-subtle text-sm">Assertive – Interrogative/Imperative/Exclamatory</p>
          </div>
        </div>
      </div>

      {/* Simple-Complex-Compound Overview Table */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Simple – Complex – Compound Overview</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-sf-text-muted/20">
                <TableHead className="text-sf-text-bold">Type</TableHead>
                <TableHead className="text-sf-text-bold">Description</TableHead>
                <TableHead className="text-sf-text-bold">Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transformationOverview.map((row, index) => (
                <TableRow key={index} className="border-sf-text-muted/20">
                  <TableCell className="text-sf-text-subtle font-medium">{row.type}</TableCell>
                  <TableCell className="text-sf-text-subtle">{row.description}</TableCell>
                  <TableCell className="text-sf-text-subtle font-mono">{row.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Degree Overview Table */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Degree Overview</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-sf-text-muted/20">
                <TableHead className="text-sf-text-bold">Degree</TableHead>
                <TableHead className="text-sf-text-bold">Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {degreeTable.map((row, index) => (
                <TableRow key={index} className="border-sf-text-muted/20">
                  <TableCell className="text-sf-text-subtle font-medium">{row.degree}</TableCell>
                  <TableCell className="text-sf-text-subtle font-mono">{row.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Rules by Category */}
      {Object.entries(rulesByCategory).map(([category, rules]) => (
        <div key={category} className="space-y-6">
          <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-sf-text-bold mb-3">
              {getCategoryTitle(category)}
            </h2>
            <p className="text-sf-text-subtle mb-6">
              {getCategoryDescription(category)}
            </p>
            
            <div className="space-y-6">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/30 transition-all duration-300"
                >
                  {/* Rule Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-sf-button border-sf-button/30">
                          {rule.ruleNo}
                        </Badge>
                        <h3 className="text-xl font-bold text-sf-text-bold">
                          {rule.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sf-text-muted text-sm">
                        <span className="font-medium">Bengali:</span> {rule.bengali}
                      </p>
                      <p className="text-sf-text-subtle">
                        <span className="font-medium">Usage:</span> {rule.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Structures */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-sf-text-bold mb-3">Structures:</h4>
                    <div className="space-y-3">
                      {rule.structures.map((structure, index) => (
                        <div
                          key={index}
                          className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg"
                        >
                          <p className="text-sf-text-subtle font-mono text-sm leading-relaxed">
                            {structure}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-lg font-semibold text-sf-text-bold mb-3">Examples:</h4>
                    <div className="space-y-3">
                      {rule.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg"
                        >
                          <p className="text-sf-text-subtle leading-relaxed">
                            {example}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Practice Link */}
      <div className="mt-12 text-center bg-sf-highlight/10 rounded-xl p-8 border border-sf-button/20">
        <h3 className="text-xl font-bold text-sf-text-bold mb-4">
          Ready to Practice?
        </h3>
        <p className="text-sf-text-subtle mb-6">
          Now that you've learned the rules, practice with real HSC board questions 
          to master transformation techniques.
        </p>
        <Link
          href="/board-questions/hsc/transformation"
          className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
        >
          <FileText className="h-5 w-5 mr-2" />
          <span>Practice with Board Questions</span>
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}