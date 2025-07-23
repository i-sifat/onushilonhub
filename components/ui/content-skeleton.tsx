'use client';

import { cn } from '@/lib/utils';

interface ContentSkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'default' | 'card' | 'list' | 'topic';
}

interface SkeletonLineProps {
  width: string;
  className?: string;
}

function SkeletonLine({ width, className }: SkeletonLineProps) {
  return (
    <div 
      className={cn(
        "h-4 bg-sf-text-muted/20 rounded-lg animate-pulse",
        className
      )}
      style={{ width }}
    />
  );
}

/**
 * ContentSkeleton - A flexible skeleton loader for smooth loading transitions
 * Supports different variants for various content types
 */
export default function ContentSkeleton({ 
  className,
  lines = 3,
  variant = 'default'
}: ContentSkeletonProps) {
  if (variant === 'card') {
    return (
      <div 
        className={cn(
          "rounded-xl border border-sf-text-muted/20 bg-neutral-800 p-6 space-y-4",
          className
        )}
        data-testid="content-skeleton-card"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sf-text-muted/20 rounded-full animate-pulse" />
          <div className="space-y-2 flex-1">
            <SkeletonLine width="60%" />
            <SkeletonLine width="40%" className="h-3" />
          </div>
        </div>
        <SkeletonLine width="100%" />
        <SkeletonLine width="80%" />
        <div className="flex items-center justify-between pt-2">
          <SkeletonLine width="30%" className="h-3" />
          <SkeletonLine width="20%" className="h-8" />
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div 
        className={cn("space-y-4", className)}
        data-testid="content-skeleton-list"
      >
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-sf-text-muted/20 bg-neutral-800">
            <div className="w-12 h-12 bg-sf-text-muted/20 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <SkeletonLine width="70%" />
              <SkeletonLine width="50%" className="h-3" />
            </div>
            <SkeletonLine width="15%" className="h-8" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'topic') {
    return (
      <div 
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          className
        )}
        data-testid="content-skeleton-topic"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-square rounded-xl border border-sf-text-muted/20 bg-neutral-800 p-4 space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-sf-text-muted/20 rounded-full animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <SkeletonLine width="80%" className="mx-auto" />
              <SkeletonLine width="60%" className="h-3 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className={cn("space-y-4 animate-pulse", className)}
      data-testid="content-skeleton-default"
    >
      <SkeletonLine width="75%" />
      <SkeletonLine width="50%" />
      <SkeletonLine width="85%" />
      {lines > 3 && Array.from({ length: lines - 3 }).map((_, index) => (
        <SkeletonLine 
          key={index} 
          width={`${Math.floor(Math.random() * 40) + 50}%`} 
        />
      ))}
    </div>
  );
}