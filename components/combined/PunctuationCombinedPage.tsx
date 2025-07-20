import CentralizedGrammarPage from './CentralizedGrammarPage';
import { punctuationRules } from '@/data/grammar-rules/punctuation';
import { punctuationQuestions } from '@/data/questions/punctuation';

export default function PunctuationCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Punctuation"
      rules={punctuationRules}
      questions={punctuationQuestions}
    />
  );
}