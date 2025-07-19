'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { rightFormVerbRules } from '@/data/grammar-rules/right-form-verb';

export default function RightFormVerbGrammarRules() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-sf-text-bold mb-4">
          Right Form of Verb: যা যা লক্ষ্য রাখতে হবে
        </h2>
        <div className="space-y-3 text-sf-text-subtle">
          <p>• প্রথমেই সম্পূর্ণ Passage-টি পড়ে তা বোঝার চেষ্টা করতে হবে।</p>
          <p>• নিচের Right Form of Verb এর নিয়ম সমূহ প্রয়োগ করতে হবে।</p>
          <p>• Passage-টি কোন Tense-এ লিখা তা বাহির করতে হবে এবং কোনো নিয়মে না পরলে সেই Tense/Verb অনুযায়ী উত্তর দিতে হবে।</p>
          <p>• 'Be' এর পরিবর্তে Tense ও Subject অনুযায়ী যেকোনো Primary Auxiliary ব্যবহার করা যাবে।</p>
        </div>
      </div>

      {/* Verb Types */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-sf-text-bold mb-4">Verb এর তালিকা ও ধরণ</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Auxiliary Verbs */}
          <div>
            <h4 className="font-semibold text-sf-text-bold mb-3">Auxiliary Verbs</h4>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sf-text-bold mb-1">Primary Auxiliaries:</p>
                <div className="text-sm text-sf-text-subtle space-y-1">
                  <p><span className="font-medium">To be:</span> are, am, is, was, were, been, being</p>
                  <p><span className="font-medium">To have:</span> have, has, had</p>
                  <p><span className="font-medium">To do:</span> do, does, did</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-sf-text-bold mb-1">Modal Auxiliaries:</p>
                <p className="text-sm text-sf-text-subtle">
                  can, could, may, might, shall, should, will, would, must, dare, need, ought to, used to, have to, be to, be going to, would rather, had better
                </p>
              </div>
            </div>
          </div>

          {/* Principal Verbs */}
          <div>
            <h4 className="font-semibold text-sf-text-bold mb-3">Principal Verb Forms</h4>
            <div className="text-sm text-sf-text-subtle space-y-1">
              <p><span className="font-medium">Present/Base form (V1):</span> eat, go</p>
              <p><span className="font-medium">Past form (V2):</span> ate, went</p>
              <p><span className="font-medium">Past participle (V3):</span> eaten, gone</p>
              <p><span className="font-medium">Verb+s/es form:</span> eats, goes</p>
              <p><span className="font-medium">Gerund form (V+ing):</span> eating, going</p>
              <p><span className="font-medium">Infinitive form (to+V1):</span> to eat, to go</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-6">
        {rightFormVerbRules.map((rule) => (
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
                  <h2 className="text-xl font-bold text-sf-text-bold">
                    {rule.title}
                  </h2>
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
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Structures:</h3>
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
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Examples:</h3>
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

            {/* Notes */}
            {rule.notes && rule.notes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Notes:</h3>
                <div className="space-y-2">
                  {rule.notes.map((note, index) => (
                    <div
                      key={index}
                      className="bg-sf-button/10 border-l-4 border-sf-button p-3 rounded-r-lg"
                    >
                      <p className="text-sf-text-subtle text-sm leading-relaxed">
                        <span className="font-medium">Note:</span> {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Memory Techniques */}
      <div className="bg-sf-bg border border-sf-button/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-sf-text-bold mb-4">
          মনে রাখার কৌশল (Memory Techniques)
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Past Tense Indicators:</h4>
              <div className="bg-sf-highlight/10 p-3 rounded-lg">
                <p className="text-sf-text-subtle text-sm font-mono">
                  <span className="font-bold">Pally bou:</span> Previously, Ago, Last, Yesterday, Before, Once, Upon a time
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Present Tense Indicators:</h4>
              <div className="bg-sf-highlight/10 p-3 rounded-lg">
                <p className="text-sf-text-subtle text-sm font-mono">
                  <span className="font-bold">HUS:</span> Habitual Fact, Universal Truth, Scientific Truth
                </p>
                <p className="text-sf-text-subtle text-sm font-mono mt-1">
                  <span className="font-bold">Arguon Fedo:</span> Always, Regularly, Generally, Usually, Occasionally, Normally, Frequently, Everyday, Daily, Often
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Continuous Tense Indicators:</h4>
              <div className="bg-sf-highlight/10 p-3 rounded-lg">
                <p className="text-sf-text-subtle text-sm font-mono">
                  <span className="font-bold">DAN TIR:</span> Day by day, At present, Now, The moment, Increasingly, Rapidly
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Perfect Tense Indicators:</h4>
              <div className="bg-sf-highlight/10 p-3 rounded-lg">
                <p className="text-sf-text-subtle text-sm font-mono">
                  <span className="font-bold">JAYLER:</span> Just, Already, Yet, Lately, Ever, Recently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Link */}
      <div className="mt-12 text-center bg-sf-highlight/10 rounded-xl p-8 border border-sf-button/20">
        <h3 className="text-xl font-bold text-sf-text-bold mb-4">
          Ready to Practice?
        </h3>
        <p className="text-sf-text-subtle mb-6">
          Now that you've learned the rules, practice with real HSC board questions 
          to master right form of verb techniques.
        </p>
        <Link
          href="/board-questions/hsc/use-of-verbs"
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