'use client';

import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewMode = 'list' | 'grid';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

/**
 * ViewModeToggle - A consistent list/grid view toggle component
 * 
 * Features:
 * - Theme-consistent styling using sf-button colors
 * - Smooth transitions and hover effects
 * - Accessible keyboard navigation
 * - Consistent behavior across all pages
 */
export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
  className
}) => {
  return (
    <div className={cn(
      "flex items-center border border-sf-text-muted/20 rounded-lg overflow-hidden",
      "bg-neutral-800/50 backdrop-blur-sm",
      className
    )}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange('list')}
        className={cn(
          "rounded-none border-0 transition-all duration-200 px-3 py-2",
          "focus:ring-2 focus:ring-sf-button focus:ring-offset-2 focus:ring-offset-sf-bg",
          viewMode === 'list' 
            ? [
                "bg-sf-button text-sf-bg hover:bg-sf-button/90",
                "shadow-sm border-r border-sf-button/20"
              ]
            : [
                "text-sf-text-subtle hover:bg-sf-button/10 hover:text-sf-button",
                "hover:shadow-sm"
              ]
        )}
        aria-label="List view"
        aria-pressed={viewMode === 'list'}
      >
        <List className="h-4 w-4" />
      </Button>
      
      <div className="w-px h-6 bg-sf-text-muted/20" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className={cn(
          "rounded-none border-0 transition-all duration-200 px-3 py-2",
          "focus:ring-2 focus:ring-sf-button focus:ring-offset-2 focus:ring-offset-sf-bg",
          viewMode === 'grid' 
            ? [
                "bg-sf-button text-sf-bg hover:bg-sf-button/90",
                "shadow-sm border-l border-sf-button/20"
              ]
            : [
                "text-sf-text-subtle hover:bg-sf-button/10 hover:text-sf-button",
                "hover:shadow-sm"
              ]
        )}
        aria-label="Grid view"
        aria-pressed={viewMode === 'grid'}
      >
        <Grid className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;