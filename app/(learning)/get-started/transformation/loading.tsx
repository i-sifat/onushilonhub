import { TopicCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function GetStartedTransformationLoading() {
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
          <div className="h-10 bg-sf-text/10 rounded-md w-88 mx-auto animate-pulse" />
          <div className="h-5 bg-sf-text/10 rounded-md w-96 mx-auto animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <LoadingSpinner size="md" text="Loading transformation resources..." />
          </div>
          
          {/* Overview section skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-sf-text/10 rounded-md w-48 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-sf-text/10 rounded w-full animate-pulse" />
              <div className="h-4 bg-sf-text/10 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-sf-text/10 rounded w-4/5 animate-pulse" />
            </div>
          </div>

          {/* Resources grid skeleton */}
          <ListSkeleton 
            count={4} 
            itemComponent={TopicCardSkeleton}
            className="grid gap-4 md:grid-cols-2"
          />
        </div>
      </div>
    </div>
  );
}