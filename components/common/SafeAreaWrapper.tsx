import React from 'react';
import { cn } from '@/lib/utils';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'spacious';
}

/**
 * SafeAreaWrapper provides responsive padding configuration for content areas
 * Ensures content is not too close to page borders on all screen sizes
 * Implements consistent spacing between content sections
 */
const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ 
  children, 
  className,
  variant = 'default'
}) => {
  const paddingClasses = {
    default: 'px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12',
    compact: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8',
    spacious: 'px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-16'
  };

  return (
    <div className={cn(paddingClasses[variant], className)}>
      {children}
    </div>
  );
};

export default SafeAreaWrapper;