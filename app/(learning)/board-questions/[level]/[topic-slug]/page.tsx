import { notFound } from 'next/navigation';
import { getTopicBySlug, getTopicsByLevel } from '@/data/topics';
import { getQuestionsByTopic } from '@/data/questions';
import { QuestionTopicSlug } from '@/types/question.types';

interface PageProps {
  params: {
    level: 'hsc' | 'ssc';
    'topic-slug': string;
  };
}

export default function TopicBoardQuestionsPage({ params }: PageProps) {
  const { level, 'topic-slug': topicSlug } = params;
  
  // Convert level to proper case
  const questionLevel = level.toUpperCase() as 'HSC' | 'SSC';
  
  // Find the topic configuration
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic || (topic.level !== questionLevel && topic.level !== 'BOTH')) {
    notFound();
  }

  // Get questions for this topic
  const questionsData = getQuestionsByTopic(topicSlug as QuestionTopicSlug);
  
  if (!questionsData) {
    notFound();
  }

  // Filter questions by level if needed
  const filteredQuestions = questionsData.questions.filter(
    question => !question.level || question.level === questionLevel
  );

  // Group questions by year and board
  const questionsByYear = filteredQuestions.reduce((acc, question) => {
    const year = question.year || 'Unknown';
    const board = question.board || 'General';
    
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year]![board]) {
      acc[year]![board] = [];
    }
    
    acc[year]![board]!.push(question);
    return acc;
  }, {} as Record<string | number, Record<string, typeof filteredQuestions>>);

  const sortedYears = Object.keys(questionsByYear)
    .filter(year => year !== 'Unknown')
    .map(Number)
    .sort((a, b) => b - a);

  if (sortedYears.length === 0 && !questionsByYear['Unknown']) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
          <p className="text-gray-600">
            Questions for {topic.name} ({questionLevel}) are not available yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{topic.icon}</span>
          <h1 className="text-3xl font-bold">{topic.name} - Board Questions</h1>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
            {questionLevel}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{topic.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>📊 Difficulty: {topic.difficulty}</span>
          <span>❓ Total Questions: {filteredQuestions.length}</span>
          <span>📅 Years Available: {sortedYears.length}</span>
        </div>
      </div>

      <div className="space-y-8">
        {sortedYears.map(year => (
          <div key={year} className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
              {year} Board Questions
            </h2>
            
            {Object.entries(questionsByYear[year] || {}).map(([board, questions]) => (
              <div key={board} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">
                  {board} Board
                </h3>
                
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Question {index + 1}
                        </span>
                        {question.marks && (
                          <span className="text-sm text-gray-500">
                            Marks: {question.marks}
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        {question.passage && (
                          <div className="mb-3 p-3 bg-blue-50 rounded border">
                            <p className="text-sm text-gray-700 italic">{question.passage}</p>
                          </div>
                        )}
                        <p className="text-gray-800 font-medium">{question.question}</p>
                      </div>
                      
                      {question.answer && (
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                            Show Answer
                          </summary>
                          <div className="mt-2 p-3 bg-green-50 rounded border border-green-200">
                            <p className="text-green-800">{question.answer}</p>
                            {question.explanation && (
                              <p className="text-green-700 text-sm mt-2 italic">
                                {question.explanation}
                              </p>
                            )}
                          </div>
                        </details>
                      )}
                      
                      {question.difficulty && (
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                            question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {questionsByYear['Unknown'] && (
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
              General Questions
            </h2>
            
            {Object.entries(questionsByYear['Unknown'] || {}).map(([board, questions]) => (
              <div key={board} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">
                  {board}
                </h3>
                
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Question {index + 1}
                        </span>
                        {question.marks && (
                          <span className="text-sm text-gray-500">
                            Marks: {question.marks}
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        {question.passage && (
                          <div className="mb-3 p-3 bg-blue-50 rounded border">
                            <p className="text-sm text-gray-700 italic">{question.passage}</p>
                          </div>
                        )}
                        <p className="text-gray-800 font-medium">{question.question}</p>
                      </div>
                      
                      {question.answer && (
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                            Show Answer
                          </summary>
                          <div className="mt-2 p-3 bg-green-50 rounded border border-green-200">
                            <p className="text-green-800">{question.answer}</p>
                            {question.explanation && (
                              <p className="text-green-700 text-sm mt-2 italic">
                                {question.explanation}
                              </p>
                            )}
                          </div>
                        </details>
                      )}
                      
                      {question.difficulty && (
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                            question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const hscTopics = getTopicsByLevel('HSC');
  const sscTopics = getTopicsByLevel('SSC');
  
  const params = [];
  
  // Generate params for HSC topics
  for (const topic of hscTopics) {
    params.push({
      level: 'hsc',
      'topic-slug': topic.slug
    });
  }
  
  // Generate params for SSC topics
  for (const topic of sscTopics) {
    params.push({
      level: 'ssc', 
      'topic-slug': topic.slug
    });
  }
  
  return params;
}