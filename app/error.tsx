'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error caught:', error);
    }
    
    // In production, you might want to log to an external service
    // logErrorToService(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-sf-bg">
      <Card className="w-full max-w-lg border-red-200 bg-red-50/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100/20">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-xl text-sf-text-bold">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-sf-text-subtle">
            We encountered an unexpected error while loading the page. This might be a temporary issue.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-sf-text-muted hover:text-sf-text-subtle mb-2">
                Error Details (Development Only)
              </summary>
              <div className="text-xs text-red-600 bg-red-50/10 p-3 rounded border border-red-200/20 overflow-auto">
                <div className="font-medium mb-2">Error Message:</div>
                <div className="mb-3">{error.message}</div>
                
                {error.digest && (
                  <>
                    <div className="font-medium mb-2">Error Digest:</div>
                    <div className="mb-3 font-mono">{error.digest}</div>
                  </>
                )}
                
                {error.stack && (
                  <>
                    <div className="font-medium mb-2">Stack Trace:</div>
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
              <span>Try Again</span>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-sf-text-muted">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}