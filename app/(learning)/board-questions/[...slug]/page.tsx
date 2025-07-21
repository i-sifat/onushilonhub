import { notFound, redirect } from 'next/navigation';
import { getTopicBySlug, getTopicsByLevel } from '@/data/topics';
import { getQuestionById, getQuestionsByTopic } from '@/data/questions';
import { QuestionTopicSlug } from '@/types/question.types';

interface PageProps {
  params: {
    slug: string[];
  };
}

export default function BoardQuestionsCatchAllPage({ params }: PageProps) {
  const { slug } = params;
  
  // Handle different slug patterns
  if (slug.length === 1) {
    // Pattern: /board-questions/[level-or-topic]
    const segment = slug[0];
    
    if (!segment) {
      notFound();
    }
    
    // Check if it's a level (hsc/ssc)
    if (segment === 'hsc' || segment === 'ssc') {
      // Redirect to the level page
      redirect(`/board-questions/${segment}`);
    }
    
    // Check if it's a topic slug
    const topic = getTopicBySlug(segment);
    if (topic) {
      // Redirect to the appropriate level page for this topic
      const level = topic.level === 'BOTH' ? 'hsc' : topic.level.toLowerCase();
      redirect(`/board-questions/${level}/${segment}`);
    }
    
    notFound();
  }
  
  if (slug.length === 2) {
    // Pattern: /board-questions/[level]/[topic]
    const [level, topicSlug] = slug;
    
    if (!level || !topicSlug) {
      notFound();
    }
    
    // Validate level
    if (level !== 'hsc' && level !== 'ssc') {
      notFound();
    }
    
    // Validate topic
    const topic = getTopicBySlug(topicSlug);
    if (!topic) {
      notFound();
    }
    
    // Redirect to the proper dynamic route
    redirect(`/board-questions/${level}/${topicSlug}`);
  }
  
  if (slug.length === 3) {
    // Pattern: /board-questions/[level]/[topic]/[question-id]
    const [level, topicSlug, questionId] = slug;
    
    if (!level || !topicSlug || !questionId) {
      notFound();
    }
    
    // Validate level
    if (level !== 'hsc' && level !== 'ssc') {
      notFound();
    }
    
    // Validate topic
    const topic = getTopicBySlug(topicSlug);
    if (!topic) {
      notFound();
    }
    
    // Validate question exists and belongs to the topic
    const question = getQuestionById(questionId);
    if (!question || question.topic !== topicSlug) {
      notFound();
    }
    
    // Redirect to the proper dynamic route
    redirect(`/board-questions/${level}/${topicSlug}/${questionId}`);
  }
  
  if (slug.length >= 4) {
    // Pattern: /board-questions/[level]/[topic]/[question-id]/[...extra]
    const [level, topicSlug, questionId] = slug;
    
    if (!level || !topicSlug || !questionId) {
      notFound();
    }
    
    // Validate level, topic, and question
    if ((level !== 'hsc' && level !== 'ssc') || 
        !getTopicBySlug(topicSlug) || 
        !getQuestionById(questionId)) {
      notFound();
    }
    
    // For now, redirect to the question page, ignoring extra segments
    redirect(`/board-questions/${level}/${topicSlug}/${questionId}`);
  }
  
  notFound();
}

// This catch-all route should handle various patterns
export async function generateStaticParams() {
  const hscTopics = getTopicsByLevel('HSC');
  const sscTopics = getTopicsByLevel('SSC');
  
  const params = [];
  
  // Generate single-segment params for topics (will redirect to proper level)
  const allTopics = [...hscTopics, ...sscTopics];
  const uniqueTopics = Array.from(new Set(allTopics.map(t => t.slug)));
  
  for (const topicSlug of uniqueTopics) {
    params.push({
      slug: [topicSlug]
    });
  }
  
  // Generate level-only params
  params.push({ slug: ['hsc'] });
  params.push({ slug: ['ssc'] });
  
  // Generate level/topic combinations
  for (const topic of hscTopics) {
    params.push({
      slug: ['hsc', topic.slug]
    });
  }
  
  for (const topic of sscTopics) {
    params.push({
      slug: ['ssc', topic.slug]
    });
  }
  
  // Generate level/topic/question combinations
  for (const topic of hscTopics) {
    const questionsData = getQuestionsByTopic(topic.slug as QuestionTopicSlug);
    if (questionsData) {
      const hscQuestions = questionsData.questions.filter(
        q => !q.level || q.level === 'HSC'
      );
      
      for (const question of hscQuestions) {
        params.push({
          slug: ['hsc', topic.slug, question.id]
        });
      }
    }
  }
  
  for (const topic of sscTopics) {
    const questionsData = getQuestionsByTopic(topic.slug as QuestionTopicSlug);
    if (questionsData) {
      const sscQuestions = questionsData.questions.filter(
        q => !q.level || q.level === 'SSC'
      );
      
      for (const question of sscQuestions) {
        params.push({
          slug: ['ssc', topic.slug, question.id]
        });
      }
    }
  }
  
  return params;
}