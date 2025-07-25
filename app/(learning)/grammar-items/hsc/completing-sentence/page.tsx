import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { completingSentenceRules } from '@/data/grammar-rules/completing-sentence';

export const metadata = {
  title: 'HSC Completing Sentence Grammar Rules | OnushilonHub',
  description: 'Master HSC completing sentence grammar rules with comprehensive explanations and examples in Bengali and English.',
};

// Topic introduction content (similar to modifier)
const completingSentenceIntroduction = {
  title: "What is Completing Sentence?",
  banglaDescription: "Completing Sentence হল এমন একটি ব্যাকরণ বিষয় যেখানে অসম্পূর্ণ বাক্যকে সঠিক clause বা phrase দিয়ে সম্পূর্ণ করতে হয়।",
  types: {
    title: "Completing Sentence কত প্রকার?",
    description: "Completing Sentence বিভিন্ন ধরনের clause এবং phrase ব্যবহার করে:",
    list: [
      "Conditional clauses (If, Unless, Provided)",
      "Time clauses (When, While, Until, Since)",
      "Purpose clauses (So that, In order that, Lest)",
      "Contrast clauses (Though, Although, Despite)"
    ]
  }
};

export default function HSCCompletingSentenceRulesPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Completing Sentence"
          topicSlug="completing-sentence"
          rules={completingSentenceRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
          topicIntroduction={completingSentenceIntroduction}
        />
      </SafeAreaWrapper>
    </div>
  );
}