import React, { lazy } from 'react';

// Lazy load components that are not immediately visible
export const LazyUniversalGrammarUI = lazy(() => import('@/components/universal/UniversalGrammarUI'));
export const LazyUniversalQuestionsUI = lazy(() => import('@/components/universal/UniversalQuestionsUI'));
export const LazyCollapsibleTopicIntroduction = lazy(() => import('@/components/ui/collapsible-topic-introduction'));
export const LazyInteractiveAnswerReveal = lazy(() => import('@/components/ui/interactive-answer-reveal'));
export const LazyGrammarRuleDisplay = lazy(() => import('@/components/grammar/GrammarRuleDisplay'));

// Lazy load heavy UI components
export const LazyViewModeToggle = lazy(() => import('@/components/ui/view-mode-toggle'));
export const LazyContentBox = lazy(() => import('@/components/ui/content-box'));

// Performance-optimized lazy loading with preload capability
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  preload = false
) => {
  const LazyComponent = lazy(importFn);
  
  if (preload && typeof window !== 'undefined') {
    // Preload the component after a short delay
    setTimeout(() => {
      importFn();
    }, 100);
  }
  
  return LazyComponent;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  const [ref, setRef] = React.useState<HTMLElement | null>(null);
  
  React.useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );
    
    observer.observe(ref);
    
    return () => observer.disconnect();
  }, [ref, callback, options]);
  
  return setRef;
};