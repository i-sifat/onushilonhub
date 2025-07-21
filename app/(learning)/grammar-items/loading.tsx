import { GrammarRuleCardSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';

export default function GrammarItemsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-sf-text/10 rounded-md w-56 animate-pulse" />
          <div className="h-4 bg-sf-text/10 rounded-md w-80 animate-pulse" />
        </div>
        
        {/* Level selector skeleton */}
        <div className="flex gap-4 p-4 bg-sf-card rounded-lg border border-sf-border">
          <div className="h-10 bg-sf-text/10 rounded-md w-20 animate-pulse" />
          <div className="h-10 bg-sf-text/10 rounded-md w-20 animate-pulse" />
        </div>
        
        {/* Grammar rules list skeleton */}
        <ListSkeleton 
          count={5} 
          itemComponent={GrammarRuleCardSkeleton}
          className="space-y-4"
        />
      </div>
    </div>
  );
}