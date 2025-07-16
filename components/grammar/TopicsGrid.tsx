'use client';

import HSCTopicsGrid from './HSCTopicsGrid';

interface TopicsGridProps {
  level: 'hsc' | 'ssc';
}

export default function TopicsGrid({ level }: TopicsGridProps) {
  if (level === 'hsc') {
    return <HSCTopicsGrid level={level} />;
  }
  
  // For SSC, we can create a similar component later
  return (
    <div className="text-center py-12">
      <p className="text-sf-text-subtle">SSC topics grid coming soon...</p>
    </div>
  );
}