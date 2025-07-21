import { TopicCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';

export default function GetStartedHSCLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-10 bg-sf-text/10 rounded-md w-80 mx-auto animate-pulse" />
          <div className="h-5 bg-sf-text/10 rounded-md w-96 mx-auto animate-pulse" />
        </div>
        
        {/* Topics grid skeleton */}
        <div className="space-y-6">
          <div className="h-7 bg-sf-text/10 rounded-md w-48 animate-pulse" />
          <ListSkeleton 
            count={6} 
            itemComponent={TopicCardSkeleton}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div>
    </div>
  );
}