'use client';

import { cn } from '@/lib/utils';

interface PageLoadingSpinnerProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
};

/**
 * PageLoadingSpinner - A beautiful animated spinner for page content loading
 * Features dual rotating rings with theme-consistent colors
 */
export default function PageLoadingSpinner({ 
  message,
  className,
  size = 'md'
}: PageLoadingSpinnerProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] space-y-4",
        className
      )}
      data-testid="page-loading-spinner"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className={cn(
          "border-4 border-sf-text-muted/20 border-t-sf-button rounded-full animate-spin",
          sizeClasses[size]
        )} />
        
        {/* Inner ring with reverse animation */}
        <div className={cn(
          "absolute inset-0 border-4 border-transparent border-r-sf-highlight rounded-full animate-spin",
          sizeClasses[size]
        )} 
        style={{
          animationDirection: 'reverse',
          animationDuration: '1.5s'
        }} />
      </div>
      
      {message && (
        <p className="text-sf-text-subtle animate-pulse text-center max-w-md">
          {message}
        </p>
      )}
    </div>
  );
}