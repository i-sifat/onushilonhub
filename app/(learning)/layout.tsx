import { ReactNode } from 'react';

interface LearningLayoutProps {
  children: ReactNode;
}

export default function LearningLayout({ children }: LearningLayoutProps) {
  return (
    <div className="min-h-screen bg-sf-bg">
      {/* Full-width learning layout without sidebar */}
      <div className="w-full">
        {/* Main content area - full width */}
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}