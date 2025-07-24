'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/utils/animations';

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
    ? cn(
        'fixed top-4 left-4 z-50 bg-sf-bg/80 backdrop-blur-sm rounded-lg px-3 py-2',
        'border border-sf-text-muted/20 hover:bg-sf-bg/90',
        animations.enhancedButton.subtleHover
      )
    : '';

  return (
    <button
      onClick={handleBack}
      className={cn(
        "inline-flex items-center space-x-2 text-sf-button font-medium group",
        animations.enhancedButton.subtleHover,
        "hover:text-sf-button/90",
        positionClasses,
        className
      )}
      aria-label="Go back to previous page"
    >
      <ArrowLeft className={cn(
        "h-4 w-4 transition-transform duration-200 ease-out",
        "group-hover:-translate-x-0.5 group-hover:scale-110"
      )} />
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
}