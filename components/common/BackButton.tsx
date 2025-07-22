'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  text?: string;
  position?: 'default' | 'top-left';
}

export default function BackButton({ 
  className = "", 
  text = "Back", 
  position = 'top-left' 
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const positionClasses = position === 'top-left' 
    ? 'fixed top-4 left-4 z-50 bg-sf-bg/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-sf-text-muted/20 hover:bg-sf-bg/90' 
    : '';

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center space-x-2 text-sf-button hover:text-sf-button/80 transition-all duration-200 font-medium ${positionClasses} ${className}`}
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
}