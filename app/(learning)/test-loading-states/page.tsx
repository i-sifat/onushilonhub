'use client';

import { useState } from 'react';
import TopLoadingBar from '@/components/ui/top-loading-bar';
import PageLoadingSpinner from '@/components/ui/page-loading-spinner';
import ContentSkeleton from '@/components/ui/content-skeleton';

export default function TestLoadingStatesPage() {
  const [showTopBar, setShowTopBar] = useState(false);
  const [spinnerSize, setSpinnerSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [skeletonVariant, setSkeletonVariant] = useState<'default' | 'card' | 'list' | 'topic'>('default');

  const toggleTopBar = () => {
    setShowTopBar(true);
    setTimeout(() => setShowTopBar(false), 3000);
  };

  return (
    <div className="min-h-screen bg-sf-bg text-sf-text-subtle p-8">
      <TopLoadingBar isVisible={showTopBar} />
      
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-sf-text-bold">Loading States Demo</h1>
          <p className="text-lg text-sf-text-subtle">
            Showcasing beautiful loading components with theme-consistent animations
          </p>
        </div>

        {/* Top Loading Bar Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Top Loading Bar</h2>
          <p className="text-sf-text-subtle">
            A horizontal loading bar that appears at the top of the page for navigation loading states.
          </p>
          <button
            onClick={toggleTopBar}
            className="bg-sf-button text-sf-bg px-6 py-3 rounded-lg font-medium hover:bg-sf-button/90 transition-colors"
          >
            Show Top Loading Bar (3s)
          </button>
        </section>

        {/* Page Loading Spinner Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Page Loading Spinner</h2>
          <p className="text-sf-text-subtle">
            Beautiful dual-ring spinner for content loading with customizable sizes and messages.
          </p>
          
          <div className="flex gap-4 items-center">
            <label className="text-sf-text-subtle">Size:</label>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSpinnerSize(size)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  spinnerSize === size
                    ? 'bg-sf-button text-sf-bg'
                    : 'bg-neutral-800 text-sf-text-subtle hover:bg-neutral-700'
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="bg-neutral-800 rounded-xl p-8">
            <PageLoadingSpinner 
              size={spinnerSize} 
              message="Loading amazing content for you..." 
            />
          </div>
        </section>

        {/* Content Skeleton Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Content Skeleton</h2>
          <p className="text-sf-text-subtle">
            Flexible skeleton loaders for smooth loading transitions with multiple variants.
          </p>
          
          <div className="flex gap-4 items-center flex-wrap">
            <label className="text-sf-text-subtle">Variant:</label>
            {(['default', 'card', 'list', 'topic'] as const).map((variant) => (
              <button
                key={variant}
                onClick={() => setSkeletonVariant(variant)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  skeletonVariant === variant
                    ? 'bg-sf-button text-sf-bg'
                    : 'bg-neutral-800 text-sf-text-subtle hover:bg-neutral-700'
                }`}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-neutral-900 rounded-xl p-8">
            <ContentSkeleton 
              variant={skeletonVariant} 
              lines={skeletonVariant === 'list' ? 4 : 3}
            />
          </div>
        </section>

        {/* Integration Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Integration Example</h2>
          <p className="text-sf-text-subtle">
            How loading components work together in a real application scenario.
          </p>
          
          <div className="bg-neutral-800 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <PageLoadingSpinner size="sm" message="Preparing your learning materials..." />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ContentSkeleton variant="card" />
              <ContentSkeleton variant="card" />
            </div>
            
            <ContentSkeleton variant="list" lines={3} />
          </div>
        </section>

        {/* Theme Consistency */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sf-text-bold">Theme Consistency</h2>
          <p className="text-sf-text-subtle">
            All loading components use consistent colors from the website theme:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-neutral-800 p-4 rounded-lg">
              <div className="w-4 h-4 bg-sf-button rounded mb-2"></div>
              <strong>sf-button:</strong> Primary loading color
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <div className="w-4 h-4 bg-sf-highlight rounded mb-2"></div>
              <strong>sf-highlight:</strong> Secondary accent color
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <div className="w-4 h-4 bg-sf-text-muted/20 rounded mb-2"></div>
              <strong>sf-text-muted/20:</strong> Skeleton background
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}