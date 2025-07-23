"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerToggleProps {
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
  defaultVisible?: boolean;
}

export const AnswerToggle: React.FC<AnswerToggleProps> = ({
  children,
  className,
  buttonClassName,
  contentClassName,
  defaultVisible = false
}) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <button
        onClick={toggleVisibility}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          "bg-neutral-800 hover:bg-neutral-700",
          "border border-sf-text-muted/20 hover:border-sf-button/50",
          "text-sf-text-subtle hover:text-sf-button",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg hover:shadow-sf-button/10",
          "focus:outline-none focus:ring-2 focus:ring-sf-button focus:ring-offset-2 focus:ring-offset-sf-bg",
          buttonClassName
        )}
        aria-label={isVisible ? "Hide answer" : "Show answer"}
      >
        {isVisible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isVisible ? "Hide Answer" : "Show Answer"}
        </span>
      </button>
      
      {isVisible && (
        <div
          className={cn(
            "rounded-xl border border-sf-text-muted/20 bg-neutral-800/50 p-4",
            "backdrop-blur-sm transition-all duration-300",
            "animate-in slide-in-from-top-2 fade-in-0",
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AnswerToggle;