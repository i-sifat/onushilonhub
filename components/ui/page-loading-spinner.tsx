'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

interface PageLoadingSpinnerProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * PageLoadingSpinner - A page-level loading spinner wrapper
 * Uses the common LoadingSpinner component for consistency
 */
export default function PageLoadingSpinner({ 
  message,
  className,
  size = 'lg'
}: PageLoadingSpinnerProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] space-y-4",
        className
      )}
      data-testid="page-loading-spinner"
    >
      <LoadingSpinner size={size} text={message} />
    </div>
  );
}