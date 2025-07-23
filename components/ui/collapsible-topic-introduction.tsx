"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export const CollapsibleTopicIntroduction: React.FC<CollapsibleTopicIntroductionProps> = ({
  title,
  banglaDescription,
  types,
  defaultExpanded = false,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={cn(
      "border-sf-text-muted/20 overflow-hidden mb-6",
      "transition-all duration-300 ease-in-out",
      "hover:border-sf-button/30",
      className
    )}>
      {/* Clickable Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-sf-button/5 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📚</div>
            <h2 className="text-lg font-semibold text-sf-text-bold">
              {title}
            </h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="p-1 h-8 w-8"
            aria-label={isExpanded ? "Collapse topic introduction" : "Expand topic introduction"}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-sf-button transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 text-sf-button transition-transform duration-200" />
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="overflow-hidden transition-all duration-300 ease-in-out animate-in slide-in-from-top-2">
          <div className="px-4 pb-4 space-y-4 border-t border-sf-text-muted/10">
            {/* Bangla Description */}
            <div className="pt-4">
              <p className="text-sf-text-subtle leading-relaxed text-base">
                {banglaDescription}
              </p>
            </div>

            {/* Types Section */}
            {types && (
              <div className="space-y-3">
                <h3 className="text-md font-semibold text-sf-text-bold">
                  {types.title}
                </h3>
                <p className="text-sf-text-subtle text-sm leading-relaxed">
                  {types.description}
                </p>
                <ul className="space-y-2 ml-2">
                  {types.list.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-sf-button rounded-full flex-shrink-0"></div>
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
};

export default CollapsibleTopicIntroduction;