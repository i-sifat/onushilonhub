'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface MarketingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MarketingError({ error, reset }: MarketingErrorProps) {
  React.useEffect(() => {
    // Log marketing page errors
    console.error('Marketing page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-200 bg-red-50/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100/20">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <CardTitle className="text-sf-text-bold">
            Page Loading Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sf-text-subtle">
            We're having trouble loading this page. Please try refreshing or return to the homepage.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-sf-text-muted hover:text-sf-text-subtle">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50/10 p-2 rounded overflow-auto max-h-32">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={reset}
              variant="default"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Homepage</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}