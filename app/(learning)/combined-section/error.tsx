'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CombinedSectionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Combined section error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sf-bg">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-sf-text-bold">
          Something went wrong!
        </h2>
        <p className="text-sf-text-muted">
          There was an error loading the combined section. Please try again.
        </p>
        <Button 
          onClick={reset}
          className="bg-sf-button hover:bg-sf-button/90 text-sf-bg"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}