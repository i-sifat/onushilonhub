import { ReactNode } from 'react';

interface LearningLayoutProps {
  children: ReactNode;
}

export default function LearningLayout({ children }: LearningLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Learning-specific layout structure */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for learning navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              <div className="pb-4">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Learning Sections
                </h2>
                <div className="space-y-1">
                  <a
                    href="/get-started"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    Get Started
                  </a>
                  <a
                    href="/grammar-items"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    Grammar Items
                  </a>
                  <a
                    href="/board-questions"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    Board Questions
                  </a>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main content area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}