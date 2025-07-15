import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackButton from '@/components/common/BackButton';
import QuestionsBrowser from '@/components/questions/QuestionsBrowser';
import { FileText, Loader2 } from 'lucide-react';
import { 
  getQuestionTopics, 
  getAvailableYears, 
  getAllAvailableBoards,
  formatTopicName 
} from '@/lib/content-loader';

export async function generateStaticParams() {
  // Only generate static params for available question topics
  return [
    { level: 'hsc', topic: 'modifier' },
    { level: 'hsc', topic: 'connector' },
    { level: 'hsc', topic: 'completing-sentence' },
    // SSC topics when available
    // { level: 'ssc', topic: 'completing-sentence' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ level: string; topic: string }> }): Promise<Metadata> {
  const { level, topic } = await params;
  const levelUpper = level.toUpperCase();
  const topicFormatted = formatTopicName(topic);
  
  return {
    title: `${topicFormatted} Questions - ${levelUpper} Board | OnushilonHub`,
    description: `Practice ${topicFormatted} questions from ${levelUpper} board examinations. Filter by year, board, and search through comprehensive question database.`,
    openGraph: {
      title: `${topicFormatted} Questions - ${levelUpper} Board | OnushilonHub`,
      description: `Practice ${topicFormatted} questions from ${levelUpper} board examinations.`,
    },
  };
}

export default async function TopicQuestionsPage({ params }: { params: Promise<{ level: string; topic: string }> }) {
  const { level, topic } = await params;

  if (!['hsc', 'ssc'].includes(level)) {
    notFound();
  }

  // Verify topic is available
  const topics = getQuestionTopics(level as 'hsc' | 'ssc');
  if (!topics.includes(topic)) {
    notFound();
  }

  // Get available filters
  const availableYears = getAvailableYears(level as 'hsc' | 'ssc', topic);
  const availableBoards = getAllAvailableBoards(level as 'hsc' | 'ssc');

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <FileText className="h-6 w-6 text-sf-button" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-sf-text-bold">
                {formatTopicName(topic)} Questions
              </h1>
              <p className="text-sf-text-muted text-sm">
                {level.toUpperCase()} Board Questions
              </p>
            </div>
          </div>
          <p className="text-sf-text-subtle">
            Practice with board questions on {formatTopicName(topic).toLowerCase()}. Use filters to find specific years and boards.
          </p>
        </div>

        {/* Questions Browser */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading questions...</span>
          </div>
        }>
          <QuestionsBrowser 
            level={level as 'hsc' | 'ssc'} 
            topic={topic}
            availableYears={availableYears}
            availableBoards={availableBoards}
          />
        </Suspense>
      </div>
    </div>
  );
}