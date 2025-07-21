import { notFound, redirect } from 'next/navigation';
import { getTopicBySlug, getTopicsByLevel } from '@/data/topics';

interface PageProps {
  params: {
    slug: string[];
  };
}

export default function GrammarItemsCatchAllPage({ params }: PageProps) {
  const { slug } = params;
  
  // Handle different slug patterns
  if (slug.length === 1) {
    // Pattern: /grammar-items/[level-or-topic]
    const segment = slug[0];
    
    if (!segment) {
      notFound();
    }
    
    // Check if it's a level (hsc/ssc)
    if (segment === 'hsc' || segment === 'ssc') {
      // Redirect to the level page
      redirect(`/grammar-items/${segment}`);
    }
    
    // Check if it's a topic slug
    const topic = getTopicBySlug(segment);
    if (topic) {
      // Redirect to the appropriate level page for this topic
      const level = topic.level === 'BOTH' ? 'hsc' : topic.level.toLowerCase();
      redirect(`/grammar-items/${level}/${segment}`);
    }
    
    notFound();
  }
  
  if (slug.length === 2) {
    // Pattern: /grammar-items/[level]/[topic]
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
    redirect(`/grammar-items/${level}/${topicSlug}`);
  }
  
  if (slug.length >= 3) {
    // Pattern: /grammar-items/[level]/[topic]/[...extra]
    const [level, topicSlug] = slug;
    
    if (!level || !topicSlug) {
      notFound();
    }
    
    // Validate level and topic
    if ((level !== 'hsc' && level !== 'ssc') || !getTopicBySlug(topicSlug)) {
      notFound();
    }
    
    // For now, redirect to the topic page, ignoring extra segments
    redirect(`/grammar-items/${level}/${topicSlug}`);
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
  
  return params;
}