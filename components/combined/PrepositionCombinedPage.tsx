import CentralizedGrammarPage from './CentralizedGrammarPage';
import { prepositionRules } from '@/data/grammar-rules/preposition';
import { prepositionQuestions } from '@/data/questions/preposition';

export default function PrepositionCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Preposition"
      rules={prepositionRules}
      questions={prepositionQuestions}
    />
  );
}