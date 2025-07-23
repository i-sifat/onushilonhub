'use client';

import { cn } from '@/lib/utils';

interface TopLoadingBarProps {
  className?: string;
  isVisible?: boolean;
}

/**
 * TopLoadingBar - A horizontal loading bar that appears at the top of the page
 * Used for page loading indication with beautiful gradient animation
 */
export default function TopLoadingBar({ 
  className,
  isVisible = true 
}: TopLoadingBarProps) {
  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        className
      )}
      data-testid="top-loading-bar"
    >
      <div className="h-1 bg-gradient-to-r from-sf-button via-sf-highlight to-sf-button">
        <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
}