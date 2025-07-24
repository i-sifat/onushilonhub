import React, { useMemo, useCallback, useRef, useEffect } from 'react';

// Debounce hook for search inputs and filters
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for scroll events and frequent updates
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Memoized filter function for topics and questions
export const useMemoizedFilter = <T>(
  items: T[],
  filterFn: (item: T) => boolean,
  dependencies: any[]
) => {
  return useMemo(() => {
    return items.filter(filterFn);
  }, [items, ...dependencies]);
};

// Memoized sort function
export const useMemoizedSort = <T>(
  items: T[],
  sortFn: (a: T, b: T) => number,
  dependencies: any[]
) => {
  return useMemo(() => {
    return [...items].sort(sortFn);
  }, [items, ...dependencies]);
};

// Virtual scrolling hook for large lists
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );

  const totalHeight = itemCount * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return {
    visibleStart,
    visibleEnd,
    totalHeight,
    offsetY,
    setScrollTop
  };
};

// Optimized event handler creator
export const createOptimizedHandler = <T extends (...args: any[]) => any>(
  handler: T,
  dependencies: any[] = []
): T => {
  return useCallback(handler, dependencies) as T;
};

// Memoized computation hook
export const useMemoizedComputation = <T>(
  computeFn: () => T,
  dependencies: any[]
): T => {
  return useMemo(computeFn, dependencies);
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render #${renderCount.current} took ${renderTime.toFixed(2)}ms`);
    }

    startTime.current = performance.now();
  });

  return renderCount.current;
};

// Optimized state updater for complex objects
export const useOptimizedState = <T extends Record<string, any>>(
  initialState: T
) => {
  const [state, setState] = React.useState<T>(initialState);

  const updateState = useCallback((updates: Partial<T>) => {
    setState(prevState => {
      // Only update if there are actual changes
      const hasChanges = Object.keys(updates).some(
        key => prevState[key] !== updates[key]
      );
      
      if (!hasChanges) return prevState;
      
      return { ...prevState, ...updates };
    });
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, updateState, resetState] as const;
};

// Cache hook for expensive computations
export const useCache = <T>(
  key: string,
  computeFn: () => T,
  dependencies: any[]
): T => {
  const cache = useRef<Map<string, T>>(new Map());

  return useMemo(() => {
    const cacheKey = `${key}-${JSON.stringify(dependencies)}`;
    
    if (cache.current.has(cacheKey)) {
      return cache.current.get(cacheKey)!;
    }

    const result = computeFn();
    cache.current.set(cacheKey, result);
    
    // Limit cache size to prevent memory leaks
    if (cache.current.size > 100) {
      const firstKey = cache.current.keys().next().value;
      cache.current.delete(firstKey);
    }

    return result;
  }, dependencies);
};