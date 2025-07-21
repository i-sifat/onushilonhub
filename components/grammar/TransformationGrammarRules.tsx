'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { transformationRules } from '@/data/grammar-rules/transformation';

export default function TransformationGrammarRules() {
  const [expertMode, setExpertMode] = useState(false);

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

  // Expert mode table data
  const expertModeData = [
    {
      category: 'Affirmative to Negative',
      rules: [
        { affirmative: 'Only/Alone (person)', negative: 'None but', example: 'A: Allah can alone help us. → N: None but Allah can help us.' },
        { affirmative: 'Only/Alone (object)', negative: 'Nothing but', example: 'A: Only the moon was visible. → N: Nothing but the moon was visible.' },
        { affirmative: 'Must / have to / has to', negative: 'Cannot but + verb in base form', example: 'A: Man must submit to destiny. → N: Man cannot but submit to destiny.' },
        { affirmative: 'Must / have to / has to', negative: 'Cannot help + (verb + ing)', example: 'A: Man must submit to destiny. → N: Man cannot help submitting to destiny.' },
        { affirmative: 'Both...and / And', negative: 'Not only...but also', example: 'A: Both Jony and Jhihad can do the work. → N: Not only Jony but also Jhihad can do the work.' },
        { affirmative: 'Every / All', negative: 'There is no...but / No...', example: 'A: Every mother loves her child. → N: There is no mother but loves her child.' },
        { affirmative: 'Always', negative: 'Never + Opposite Word', example: 'A: They always remember us. → N: They never forget us.' },
        { affirmative: 'As soon as', negative: 'No sooner had...than', example: 'A: As soon as the thief saw the police, he ran away. → N: No sooner had the thief seen the police than he ran away.' }
      ]
    },
    {
      category: 'Assertive to Exclamatory',
      rules: [
        { affirmative: "'What' is used for 'Article' (a/an) used before Adjective", negative: '', example: 'Asser: It is a good news. → Excl: What a good news!' },
        { affirmative: "'How' is used for 'Very' used before Adjective", negative: '', example: 'Asser: The place is very enchanting. → Excl: How enchanting the place is!' }
      ]
    },
    {
      category: 'Voice Change',
      rules: [
        { affirmative: 'Active to Passive', negative: 'Object becomes Subject, Main Verb becomes Past Participle', example: 'Active: Dowry hampers the peace of the society. → Passive: The peace of the society is hampered by dowry.' },
        { affirmative: 'Passive to Active', negative: 'Subject becomes Object, Past Participle becomes Main Verb', example: 'Passive: It is known as an industrious creature. → Active: People/we know it as an industrious creature.' }
      ]
    },
    {
      category: 'Simple – Complex – Compound',
      rules: [
        { affirmative: 'Without + (Verb + ing)', negative: 'Negative If Clause / Unless', example: 'Simple: Without studying hard, you will fail. → Complex: If you do not study hard, you will fail. → Compound: Study hard or you will fail.' },
        { affirmative: 'By + (verb + ing)', negative: 'Affirmative If Clause', example: 'Simple: By eating a balanced diet you can keep fit. → Complex: If you eat a balanced diet, you can keep fit. → Compound: Eat a balanced diet and keep fit.' },
        { affirmative: 'Despite / In spite of', negative: 'Though / Although', example: 'Simple: In spite of his poverty, he is honest. → Complex: Though/Although he is poor, he is honest. → Compound: He is poor but honest.' },
        { affirmative: 'too...to', negative: 'So…that', example: 'Simple: He is too honest to accept bribe. → Complex: He is so honest that he can\'t accept bribe. → Compound: He is very honest and he can\'t accept bribe.' }
      ]
    },
    {
      category: 'Positive – Comparative – Superlative Degree',
      rules: [
        { affirmative: 'No other…', negative: 'than any other', example: 'Positive: No other boy in the class is as good as Tuhin. → Comparative: Tuhin is better than any other boy in the class. → Superlative: Tuhin is the best boy in the class.' },
        { affirmative: 'Very few…', negative: 'than most other / all other', example: 'Positive: Very few girls in the class are as beautiful as she. → Comparative: She is more beautiful than most other girls in the class. → Superlative: She is one of the most beautiful girls in the class.' }
      ]
    }
  ];

  if (expertMode) {
    return (
      <div className="space-y-8">
        {/* Expert Mode Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-sf-text-bold mb-2">Transformation Rules - Expert Mode</h2>
            <p className="text-sf-text-subtle">Quick reference table with main transformation patterns</p>
          </div>
          <Button
            onClick={() => setExpertMode(false)}
            variant="outline"
            className="flex items-center space-x-2 border-sf-button/30 text-sf-button hover:bg-sf-button/10"
          >
            <EyeOff className="h-4 w-4" />
            <span>Exit Expert Mode</span>
          </Button>
        </div>

        {/* Expert Mode Tables */}
        <div className="space-y-8">
          {expertModeData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-sf-text-bold mb-4">{section.category}</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-sf-text-muted/20">
                      <TableHead className="text-sf-text-bold">Pattern</TableHead>
                      <TableHead className="text-sf-text-bold">Transformation</TableHead>
                      <TableHead className="text-sf-text-bold">Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {section.rules.map((rule, index) => (
                      <TableRow key={index} className="border-sf-text-muted/20">
                        <TableCell className="text-sf-text-subtle font-medium">{rule.affirmative}</TableCell>
                        <TableCell className="text-sf-text-subtle">{rule.negative}</TableCell>
                        <TableCell className="text-sf-text-subtle text-sm">{rule.example}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>

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

  return (
    <div className="space-y-8">
      {/* Normal Mode Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sf-text-bold mb-2">Transformation Rules</h2>
          <p className="text-sf-text-subtle">Comprehensive transformation rules with detailed explanations</p>
        </div>
        <Button
          onClick={() => setExpertMode(true)}
          variant="outline"
          className="flex items-center space-x-2 border-sf-button/30 text-sf-button hover:bg-sf-button/10"
        >
          <Eye className="h-4 w-4" />
          <span>Expert Mode</span>
        </Button>
      </div>

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