'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  text?: string;
}

export default function BackButton({ className = "", text = "Back" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center space-x-2 text-sf-button hover:text-sf-button/80 transition-colors font-medium ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{text}</span>
    </button>
  );
}