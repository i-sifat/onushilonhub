import CentralizedGrammarPage from './CentralizedGrammarPage';
import { connectorsRules } from '@/data/grammar-rules/connectors';
import { connectorsQuestions } from '@/data/questions/connectors';

export default function ConnectorsCombinedPage() {
  return (
    <CentralizedGrammarPage
      topic="Connectors"
      rules={connectorsRules}
      questions={connectorsQuestions}
    />
  );
}