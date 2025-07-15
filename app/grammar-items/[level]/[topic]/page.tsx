'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import BackButton from '@/components/common/BackButton';
import { BookOpen, ArrowLeft, Loader2, FileText } from 'lucide-react';

// Required for static export
export function generateStaticParams() {
  // Return empty array since we can't scan filesystem at build time
  // Pages will be generated on-demand
  return [];
}

interface GrammarRule {
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-sf-text-bold">
                {formatTopicName(topic)}
              </h1>
              <p className="text-sf-text-muted text-sm">
                {level.toUpperCase()} Level Grammar Items
              </p>
            </div>
          </div>
        {!loading && !error && !rulesData && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sf-text-bold mb-2">
              No Grammar Items Available
            </h3>
            <p className="text-sf-text-subtle mb-6">
              Grammar items for "{formatTopicName(topic)}" haven't been uploaded yet.
            </p>
            
            <div className="bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20 text-left max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-sf-text-bold mb-2">
                To Add Grammar Items for This Topic:
              </h4>
              <p className="text-sf-text-subtle mb-4">
                Create a rules.json file at the following location:
              </p>
              <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle mb-4">
                /content/grammar-items/{level}/{topic}/rules.json
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
}