import CentralizedGrammarPage from './CentralizedGrammarPage';
import { completingSentenceRules } from '@/data/grammar-rules/completing-sentence';
import { completingSentenceQuestions } from '@/data/questions/completing-sentence';

export default function CompletingSentenceCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Completing Sentence"
      rules={completingSentenceRules}
      questions={completingSentenceQuestions}
    />
  );
}