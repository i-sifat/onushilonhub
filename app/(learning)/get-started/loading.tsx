import { TopicCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';

export default function GetStartedLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-10 bg-sf-text/10 rounded-md w-72 mx-auto animate-pulse" />
          <div className="h-5 bg-sf-text/10 rounded-md w-96 mx-auto animate-pulse" />
        </div>
        
        {/* Level sections skeleton */}
        <div className="space-y-8">
          {/* HSC Section */}
          <div className="space-y-4">
            <div className="h-7 bg-sf-text/10 rounded-md w-32 animate-pulse" />
            <ListSkeleton 
              count={4} 
              itemComponent={TopicCardSkeleton}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            />
          </div>
          
          {/* SSC Section */}
          <div className="space-y-4">
            <div className="h-7 bg-sf-text/10 rounded-md w-32 animate-pulse" />
            <ListSkeleton 
              count={4} 
              itemComponent={TopicCardSkeleton}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}