"use client";

import React, { useState, useCallback, memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/utils/animations';

interface CollapsibleTopicIntroductionProps {
  title: string;
  banglaDescription: string;
  types?: {
    title: string;
    description: string;
    list: string[];
  };
  defaultExpanded?: boolean;
  className?: string;
}

export const CollapsibleTopicIntroduction: React.FC<CollapsibleTopicIntroductionProps> = memo(({
  title,
  banglaDescription,
  types,
  defaultExpanded = false,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExpanded();
  }, [toggleExpanded]);

  return (
    <Card className={cn(
      "border-sf-text-muted/20 overflow-hidden mb-6",
      animations.presets.collapsibleCard,
      className
    )}>
      {/* Clickable Header */}
      <div 
        className={cn(
          "p-4 cursor-pointer transition-all duration-200 ease-out",
          "hover:bg-sf-button/5 hover:scale-[1.005]",
          "active:scale-[0.995]"
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "text-2xl transition-transform duration-200 ease-out",
              isExpanded ? "scale-110" : "scale-100"
            )}>
              📚
            </div>
            <h2 className={cn(
              "text-lg font-semibold transition-colors duration-200",
              "text-sf-text-bold hover:text-sf-button"
            )}>
              {title}
            </h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "p-1 h-8 w-8",
              animations.enhancedButton.ghostHover
            )}
            aria-label={isExpanded ? "Collapse topic introduction" : "Expand topic introduction"}
            onClick={handleButtonClick}
          >
            {isExpanded ? (
              <ChevronUp className={cn(
                "h-4 w-4 text-sf-button",
                animations.presets.chevronIcon,
                "rotate-0"
              )} />
            ) : (
              <ChevronDown className={cn(
                "h-4 w-4 text-sf-button",
                animations.presets.chevronIcon,
                "rotate-0 hover:rotate-180"
              )} />
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Content with Enhanced Animations */}
      {isExpanded && (
        <div className={cn(
          "overflow-hidden",
          animations.reveal.expandContent
        )}>
          <div className="px-4 pb-4 space-y-4 border-t border-sf-text-muted/10">
            {/* Bangla Description */}
            <div className={cn(
              "pt-4",
              animations.reveal.fadeIn,
              "[animation-delay:100ms]"
            )}>
              <p className="text-sf-text-subtle leading-relaxed text-base">
                {banglaDescription}
              </p>
            </div>

            {/* Types Section */}
            {types && (
              <div className={cn(
                "space-y-3",
                animations.reveal.fadeIn,
                "[animation-delay:200ms]"
              )}>
                <h3 className="text-md font-semibold text-sf-text-bold">
                  {types.title}
                </h3>
                <p className="text-sf-text-subtle text-sm leading-relaxed">
                  {types.description}
                </p>
                <ul className="space-y-2 ml-2">
                  {types.list.map((item, index) => (
                    <li 
                      key={index} 
                      className={cn(
                        "flex items-center space-x-2",
                        animations.reveal.fadeIn,
                        `[animation-delay:${300 + index * 50}ms]`
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 bg-sf-button rounded-full flex-shrink-0",
                        "transition-all duration-200 hover:scale-125"
                      )}></div>
                      <span className="text-sf-text-subtle text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
});

export default CollapsibleTopicIntroduction;