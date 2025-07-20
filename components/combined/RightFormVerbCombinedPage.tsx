import CentralizedGrammarPage from './CentralizedGrammarPage';
import { rightFormVerbRules } from '@/data/grammar-rules/right-form-verb';
import { rightFormVerbQuestions } from '@/data/questions/right-form-verb';

export default function RightFormVerbCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Right Form of Verb"
      rules={rightFormVerbRules}
      questions={rightFormVerbQuestions}
    />
  );
}