import CentralizedGrammarPage from './CentralizedGrammarPage';
import { modifierRules } from '@/data/grammar-rules/modifier';
import { modifierQuestions } from '@/data/questions/modifier';

export default function ModifierCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Modifier"
      rules={modifierRules}
      questions={modifierQuestions}
    />
  );
}
