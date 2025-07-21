import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicBySlug, getTopicsByLevel } from '@/data/topics';
import { getQuestionsByTopic, getQuestionById } from '@/data/questions';
import { QuestionTopicSlug } from '@/types/question.types';

interface PageProps {
  params: {
    level: 'hsc' | 'ssc';
    'topic-slug': string;
    'question-id': string;
  };
}

export default function QuestionDetailPage({ params }: PageProps) {
  const { level, 'topic-slug': topicSlug, 'question-id': questionId } = params;
  
  // Convert level to proper case
  const questionLevel = level.toUpperCase() as 'HSC' | 'SSC';
  
  // Find the topic configuration
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic || (topic.level !== questionLevel && topic.level !== 'BOTH')) {
    notFound();
  }

  // Get the specific question
  const question = getQuestionById(questionId);
  
  if (!question || question.topic !== topicSlug) {
    notFound();
  }

  // Get all questions for navigation
  const questionsData = getQuestionsByTopic(topicSlug as QuestionTopicSlug);
  const allQuestions = questionsData?.questions.filter(
    q => !q.level || q.level === questionLevel
  ) || [];
  
  const currentIndex = allQuestions.findIndex(q => q.id === questionId);
  const previousQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/board-questions" className="hover:text-blue-600">
          Board Questions
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/board-questions/${level}`} className="hover:text-blue-600">
          {questionLevel}
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/board-questions/${level}/${topicSlug}`} className="hover:text-blue-600">
          {topic.name}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Question {currentIndex + 1}</span>
      </nav>

      {/* Question Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{topic.icon}</span>
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
            {questionLevel}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <span>📍 Question {currentIndex + 1} of {allQuestions.length}</span>
          {question.year && <span>📅 Year: {question.year}</span>}
          {question.board && <span>🏛️ Board: {question.board}</span>}
          {question.marks && <span>📊 Marks: {question.marks}</span>}
          {question.difficulty && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {question.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-white rounded-lg shadow-md p-8 border mb-8">
        {question.passage && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Passage:</h3>
            <p className="text-blue-800 leading-relaxed">{question.passage}</p>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Question:</h2>
          <p className="text-gray-800 text-lg leading-relaxed">{question.question}</p>
        </div>

        {question.blanks && question.blanks.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Fill in the blanks:</h3>
            <div className="space-y-2">
              {question.blanks.map((blank, index) => (
                <div key={blank.id} className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">{index + 1}.</span>
                  <div className="flex-1 p-2 border-b-2 border-dashed border-gray-300">
                    <span className="text-gray-400">Answer: {blank.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {question.answer && (
          <div className="mb-6">
            <details className="group">
              <summary className="cursor-pointer text-lg font-semibold text-blue-600 hover:text-blue-800 mb-3">
                Show Answer
              </summary>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Answer:</h3>
                <p className="text-green-800 leading-relaxed">{question.answer}</p>
                
                {question.explanation && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Explanation:</h4>
                    <p className="text-green-700 leading-relaxed">{question.explanation}</p>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        {question.ruleId && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Related Grammar Rule:</span> Rule #{question.ruleId}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {previousQuestion ? (
            <Link
              href={`/board-questions/${level}/${topicSlug}/${previousQuestion.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Previous Question
            </Link>
          ) : (
            <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
              ← Previous Question
            </div>
          )}
        </div>

        <Link
          href={`/board-questions/${level}/${topicSlug}`}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          All Questions
        </Link>

        <div>
          {nextQuestion ? (
            <Link
              href={`/board-questions/${level}/${topicSlug}/${nextQuestion.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Question →
            </Link>
          ) : (
            <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
              Next Question →
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const hscTopics = getTopicsByLevel('HSC');
  const sscTopics = getTopicsByLevel('SSC');
  
  const params = [];
  
  // Generate params for HSC topics and their questions
  for (const topic of hscTopics) {
    const questionsData = getQuestionsByTopic(topic.slug as QuestionTopicSlug);
    if (questionsData) {
      const hscQuestions = questionsData.questions.filter(
        q => !q.level || q.level === 'HSC'
      );
      
      for (const question of hscQuestions) {
        params.push({
          level: 'hsc',
          'topic-slug': topic.slug,
          'question-id': question.id
        });
      }
    }
  }
  
  // Generate params for SSC topics and their questions
  for (const topic of sscTopics) {
    const questionsData = getQuestionsByTopic(topic.slug as QuestionTopicSlug);
    if (questionsData) {
      const sscQuestions = questionsData.questions.filter(
        q => !q.level || q.level === 'SSC'
      );
      
      for (const question of sscQuestions) {
        params.push({
          level: 'ssc',
          'topic-slug': topic.slug,
          'question-id': question.id
        });
      }
    }
  }
  
  return params;
}