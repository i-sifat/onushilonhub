import { GrammarRuleCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function TransformationGrammarLoading() {
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

        {/* Grammar rules list skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <LoadingSpinner size="md" text="Loading transformation grammar rules..." />
          </div>
          <ListSkeleton 
            count={6} 
            itemComponent={GrammarRuleCardSkeleton}
            className="space-y-6"
          />
        </div>
      </div>
    </div>
  );
}