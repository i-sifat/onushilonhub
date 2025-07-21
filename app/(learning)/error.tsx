'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface LearningErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LearningError({ error, reset }: LearningErrorProps) {
  React.useEffect(() => {
    // Log learning section errors
    console.error('Learning section error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-red-200 bg-red-50/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100/20">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>
          <CardTitle className="text-lg text-sf-text-bold">
            Learning Content Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-center text-sf-text-subtle">
            We encountered an issue while loading the learning content. This might be due to a temporary problem with the grammar rules or questions data.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-sf-text-muted hover:text-sf-text-subtle mb-2">
                Error Details (Development)
              </summary>
              <div className="text-xs text-red-600 bg-red-50/10 p-3 rounded border border-red-200/20 overflow-auto max-h-40">
                <div className="font-medium mb-1">Message:</div>
                <div className="mb-3">{error.message}</div>
                
                {error.digest && (
                  <>
                    <div className="font-medium mb-1">Digest:</div>
                    <div className="mb-3 font-mono text-xs">{error.digest}</div>
                  </>
                )}
                
                {error.stack && (
                  <>
                    <div className="font-medium mb-1">Stack:</div>
                    <pre className="whitespace-pre-wrap text-xs">{error.stack}</pre>
                  </>
                )}
              </div>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              variant="default"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry Loading</span>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Link href="/get-started">
                <BookOpen className="h-4 w-4" />
                <span>Learning Home</span>
              </Link>
            </Button>
            
            <Button
              asChild
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Homepage</span>
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-sf-text-muted">
              Try refreshing the page or check your internet connection.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}