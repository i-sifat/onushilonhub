'use client';

import React from 'react';
import BackButton from '@/components/common/BackButton';
import UnifiedHeaderSection from './UnifiedHeaderSection';

interface UnifiedPageLayoutProps {
  pageType: 'grammar' | 'questions' | 'combined';
  level: 'HSC' | 'SSC';
  title: string;
  description: string;
  statistics: {
    topics: number;
    rules?: number;
    questions?: number;
  };
  children: React.ReactNode;
  showBackButton?: boolean;
}

export default function UnifiedPageLayout({
  pageType,
  level,
  title,
  description,
  statistics,
  children,
  showBackButton = true
}: UnifiedPageLayoutProps) {
  return (
    <div className="min-h-screen bg-sf-bg">
      {showBackButton && (
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>
      )}
      
      <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Standardized Header */}
        <UnifiedHeaderSection
          level={level}
          title={title}
          description={description}
          statistics={statistics}
          pageType={pageType}
        />
        
        {/* Content Area */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}