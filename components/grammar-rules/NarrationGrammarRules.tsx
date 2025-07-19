'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { narrationRules } from '@/data/grammar-rules/narration';

export default function NarrationGrammarRules() {
  // Table data for different rules
  const reportingVerbTable = [
    { sentenceType: 'Assertive', reportingVerb: 'said/told', replacement: 'that' },
    { sentenceType: 'Interrogative', reportingVerb: 'asked', replacement: 'if/wh-word' },
    { sentenceType: 'Imperative', reportingVerb: 'ordered/advised/forbade/requested', replacement: 'to/not to/that' },
    { sentenceType: 'Optative', reportingVerb: 'wished/prayed', replacement: 'that' },
    { sentenceType: 'Exclamatory', reportingVerb: 'exclaimed with joy/sorrow', replacement: 'that' }
  ];

  const tenseChangeTable = [
    { direct: 'Present Indefinite', indirect: 'Past Indefinite' },
    { direct: 'Present Continuous', indirect: 'Past Continuous' },
    { direct: 'Present Perfect', indirect: 'Past Perfect' },
    { direct: 'Present Perfect Continuous', indirect: 'Past Perfect Continuous' },
    { direct: 'Past Indefinite', indirect: 'Past Perfect' },
    { direct: 'Past Continuous', indirect: 'Past Perfect Continuous' }
  ];

  const shortcutTable = [
    { direct: 'am/is', indirect: 'was' },
    { direct: 'are', indirect: 'were' },
    { direct: 'was/were', indirect: 'had been' },
    { direct: 'have/has', indirect: 'had' },
    { direct: 'V1', indirect: 'V2' },
    { direct: 'V2', indirect: 'had + V3' },
    { direct: 'did', indirect: 'had + V3' },
    { direct: 'shall/will', indirect: 'would' },
    { direct: 'can', indirect: 'could' },
    { direct: 'may', indirect: 'might' },
    { direct: 'must', indirect: 'had to' }
  ];

  const proximityWordsTable = [
    { direct: 'Now', indirect: 'Then', direct2: 'This', indirect2: 'That' },
    { direct: 'Today', indirect: 'That day', direct2: 'These', indirect2: 'Those' },
    { direct: 'Tonight', indirect: 'That night', direct2: 'Here', indirect2: 'There' },
    { direct: 'Tomorrow', indirect: 'The next day', direct2: 'Ago', indirect2: 'Before' },
    { direct: 'Yesterday', indirect: 'The previous day', direct2: 'Come', indirect2: 'Go' },
    { direct: 'Last night', indirect: 'The previous night', direct2: 'Thus', indirect2: 'So' },
    { direct: 'Next week', indirect: 'The following week', direct2: 'Hither', indirect2: 'Thither' },
    { direct: 'Sir/Madam', indirect: 'respectfully', direct2: 'Yes/OK', indirect2: 'replied in the affirmative and said that' },
    { direct: 'No', indirect: 'replied in the negative and said that', direct2: '', indirect2: '' }
  ];
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Narration কাকে বলে?</h2>
        <div className="space-y-4 text-sf-text-subtle leading-relaxed">
          <p>
            Speech শব্দের অর্থ "বক্তৃতা"। আর Narration শব্দের অর্থ "বর্ণনা"। এই দুটি শব্দ একই অর্থ নির্দেশ করে।
          </p>
          <p>
            অর্থাৎ কোনো ব্যক্তি কথা বলার সময় যা যা বলে তাই মূলত Speech/Narration.
          </p>
          <p className="font-medium text-sf-text-bold">
            সুতরাং বক্তা যা বলে তাকে Speech বা Narration বলে।
          </p>
        </div>
      </div>

      {/* Types of Speech */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Speech/Narration কত প্রকার?</h2>
        <p className="text-sf-text-subtle mb-4">Speech দুই প্রকার। যথা:</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">1. Direct Speech (প্রত্যক্ষ উক্তি)</h3>
            <p className="text-sf-text-subtle text-sm mb-3">
              যখন কোনো কথাকে পরিবর্তন না করে অবিকল সে ভাষায় বলা হয় তখন তাকে Direct Speech/Narration বলে।
            </p>
            <div className="space-y-2">
              <p className="text-sf-text-subtle text-sm">
                <span className="font-medium">উদাহরণ:</span>
              </p>
              <p className="text-sf-text-subtle text-sm">• Jamil said to me, "I am a good student."</p>
              <p className="text-sf-text-subtle text-sm">• The girl said, "I like mangoes."</p>
            </div>
          </div>
          
          <div className="bg-sf-highlight/10 border-l-4 border-sf-button p-4 rounded-r-lg">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">2. Indirect Speech (পরোক্ষ উক্তি)</h3>
            <p className="text-sf-text-subtle text-sm mb-3">
              যখন কোনো কথাকে পরিবর্তন করে ব্যক্ত করা হয় তখন তাকে Indirect Speech/Narration বলে।
            </p>
            <div className="space-y-2">
              <p className="text-sf-text-subtle text-sm">
                <span className="font-medium">উদাহরণ:</span>
              </p>
              <p className="text-sf-text-subtle text-sm">• Jamil said to me that he was a good student.</p>
              <p className="text-sf-text-subtle text-sm">• The girl said that she liked mangoes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rule 1 Table */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Rule 1: Reporting Verb ও Inverted Comma-এর পরিবর্তন</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-sf-text-muted/20">
                <TableHead className="text-sf-text-bold">Sentence Type</TableHead>
                <TableHead className="text-sf-text-bold">Reporting Verb (Said) এর পরিবর্তে বসে</TableHead>
                <TableHead className="text-sf-text-bold">Inverted Comma-এর পরিবর্তে বসে</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportingVerbTable.map((row, index) => (
                <TableRow key={index} className="border-sf-text-muted/20">
                  <TableCell className="text-sf-text-subtle font-medium">{row.sentenceType}</TableCell>
                  <TableCell className="text-sf-text-subtle">{row.reportingVerb}</TableCell>
                  <TableCell className="text-sf-text-subtle">{row.replacement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Rule 3 Tense Changes Table */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Rule 3: Narration এর Tense পরিবর্তনের নিয়ম</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Tense Changes</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-sf-text-muted/20">
                    <TableHead className="text-sf-text-bold">Direct Tense</TableHead>
                    <TableHead className="text-sf-text-bold">Indirect Tense</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenseChangeTable.map((row, index) => (
                    <TableRow key={index} className="border-sf-text-muted/20">
                      <TableCell className="text-sf-text-subtle">{row.direct}</TableCell>
                      <TableCell className="text-sf-text-subtle">{row.indirect}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Shortcut Rules</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-sf-text-muted/20">
                    <TableHead className="text-sf-text-bold">Direct</TableHead>
                    <TableHead className="text-sf-text-bold">Indirect</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shortcutTable.map((row, index) => (
                    <TableRow key={index} className="border-sf-text-muted/20">
                      <TableCell className="text-sf-text-subtle font-mono">{row.direct}</TableCell>
                      <TableCell className="text-sf-text-subtle font-mono">{row.indirect}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sf-text-muted text-sm mt-2">
              <span className="font-medium">Note:</span> Must চিরকালীন বাধ্যবাধকতা বোঝালে must এর কোনো পরিবর্তন হয় না।
            </p>
          </div>
        </div>
      </div>

      {/* Rule 4 Proximity Words Table */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">Rule 4: নিকটবর্তী Word সমূহের পরিবর্তন</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-sf-text-muted/20">
                <TableHead className="text-sf-text-bold">Direct</TableHead>
                <TableHead className="text-sf-text-bold">Indirect</TableHead>
                <TableHead className="text-sf-text-bold">Direct</TableHead>
                <TableHead className="text-sf-text-bold">Indirect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proximityWordsTable.map((row, index) => (
                <TableRow key={index} className="border-sf-text-muted/20">
                  <TableCell className="text-sf-text-subtle font-medium">{row.direct}</TableCell>
                  <TableCell className="text-sf-text-subtle">{row.indirect}</TableCell>
                  <TableCell className="text-sf-text-subtle font-medium">{row.direct2}</TableCell>
                  <TableCell className="text-sf-text-subtle">{row.indirect2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Rules List */}
      <div className="space-y-6">
        {narrationRules.map((rule) => (
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
            <div>
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
          to master narration techniques.
        </p>
        <Link
          href="/board-questions/hsc/narration"
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