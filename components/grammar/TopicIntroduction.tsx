"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TopicIntroductionProps {
  title: string;
  banglaDescription: string;
  types?: {
    title: string;
    description: string;
    list: string[];
  };
  className?: string;
}

export const TopicIntroduction: React.FC<TopicIntroductionProps> = ({
  title,
  banglaDescription,
  types,
  className
}) => {
  return (
    <div className={cn(
      "rounded-2xl border border-sf-text-muted/20 bg-neutral-800/50 p-6 mb-8",
      "backdrop-blur-sm transition-all duration-300",
      "hover:border-sf-button/30 hover:bg-neutral-800/70",
      className
    )}>
      {/* Main Title */}
      <h2 className="text-2xl font-bold text-sf-text-bold mb-4 flex items-center gap-2">
        📚 {title}
      </h2>
      
      {/* Bangla Description */}
      <p className="text-sf-text-subtle leading-relaxed text-lg mb-6">
        {banglaDescription}
      </p>
      
      {/* Types Section */}
      {types && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-sf-text-bold">
            {types.title}
          </h3>
          <p className="text-sf-text-subtle leading-relaxed">
            {types.description}
          </p>
          <ul className="space-y-2 ml-4">
            {types.list.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sf-text-subtle">
                <span className="w-2 h-2 bg-sf-button rounded-full flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopicIntroduction;