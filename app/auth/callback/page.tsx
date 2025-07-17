'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/login?error=callback_error');
          return;
        }

        if (data.session) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/login?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-sf-bg flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-sf-button mx-auto mb-4" />
        <p className="text-sf-text-subtle">Completing authentication...</p>
      </div>
    </div>
  );
}