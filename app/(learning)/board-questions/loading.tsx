import { QuestionCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';

export default function BoardQuestionsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-sf-text/10 rounded-md w-64 animate-pulse" />
          <div className="h-4 bg-sf-text/10 rounded-md w-96 animate-pulse" />
        </div>
        
        {/* Filter skeleton */}
        <div className="flex flex-wrap gap-4 p-4 bg-sf-card rounded-lg border border-sf-border">
          <div className="h-10 bg-sf-text/10 rounded-md w-32 animate-pulse" />
          <div className="h-10 bg-sf-text/10 rounded-md w-24 animate-pulse" />
          <div className="h-10 bg-sf-text/10 rounded-md w-28 animate-pulse" />
        </div>
        
        {/* Questions list skeleton */}
        <ListSkeleton 
          count={6} 
          itemComponent={QuestionCardSkeleton}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </div>
  );
}