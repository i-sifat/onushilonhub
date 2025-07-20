import CentralizedGrammarPage from './CentralizedGrammarPage';
import { synonymAntonymRules } from '@/data/grammar-rules/synonym-antonym';
import { synonymAntonymQuestions } from '@/data/questions/synonym-antonym';

export default function SynonymAntonymCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Synonym and Antonym"
      rules={synonymAntonymRules}
      questions={synonymAntonymQuestions}
    />
  );
}