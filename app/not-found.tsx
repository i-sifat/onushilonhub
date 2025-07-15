import Link from 'next/link';
import { Home, Search, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sf-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-sf-button mb-4 animate-bounce">
            404
          </div>
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-sf-button rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-sf-button rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-sf-button rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sf-text-bold mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-sf-text-subtle mb-6 leading-relaxed">
            The page you're looking for seems to have wandered off. 
            Don't worry, even the best students sometimes take a wrong turn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
          >
            <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/board-questions"
              className="inline-flex items-center justify-center bg-sf-bg border border-sf-button text-sf-button hover:bg-sf-button hover:text-sf-bg px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Questions
            </Link>
            <Link
              href="/grammar-items"
              className="inline-flex items-center justify-center bg-sf-bg border border-sf-button text-sf-button hover:bg-sf-button hover:text-sf-bg px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Grammar
            </Link>
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-8 text-sf-text-muted text-sm">
          <p>💡 Tip: Use the search feature to find what you're looking for!</p>
        </div>
      </div>
    </div>
  );
}