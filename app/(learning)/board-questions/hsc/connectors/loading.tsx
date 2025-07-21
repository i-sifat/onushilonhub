import { QuestionCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ConnectorsQuestionsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-sf-text/10 rounded w-16 animate-pulse" />
          <div className="h-4 bg-sf-text/10 rounded w-1 animate-pulse" />
          <div className="h-4 bg-sf-text/10 rounded w-20 animate-pulse" />
          <div className="h-4 bg-sf-text/10 rounded w-1 animate-pulse" />
          <div className="h-4 bg-sf-text/10 rounded w-24 animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-10 bg-sf-text/10 rounded-md w-80 mx-auto animate-pulse" />
          <div className="h-5 bg-sf-text/10 rounded-md w-72 mx-auto animate-pulse" />
        </div>

        {/* Filter skeleton */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="h-10 bg-sf-text/10 rounded-md w-32 animate-pulse" />
          <div className="h-10 bg-sf-text/10 rounded-md w-28 animate-pulse" />
          <div className="h-10 bg-sf-text/10 rounded-md w-24 animate-pulse" />
        </div>

        {/* Questions list skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <LoadingSpinner size="md" text="Loading connectors questions..." />
          </div>
          <ListSkeleton 
            count={8} 
            itemComponent={QuestionCardSkeleton}
            className="space-y-4"
          />
        </div>
      </div>
    </div>
  );
}