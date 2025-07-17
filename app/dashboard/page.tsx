import { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, BookOpen, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | OnushilonHub',
  description: 'Track your grammar learning progress and performance.',
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-sf-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sf-text-bold mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-sf-text-subtle">
              Track your grammar learning progress and performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-sf-text-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sf-text-subtle">
                  Topics Completed
                </CardTitle>
                <BookOpen className="h-4 w-4 text-sf-button" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sf-text-bold">0</div>
                <p className="text-xs text-sf-text-muted">
                  Start learning to see progress
                </p>
              </CardContent>
            </Card>

            <Card className="border-sf-text-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sf-text-subtle">
                  Questions Practiced
                </CardTitle>
                <Target className="h-4 w-4 text-sf-button" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sf-text-bold">0</div>
                <p className="text-xs text-sf-text-muted">
                  Practice to improve
                </p>
              </CardContent>
            </Card>

            <Card className="border-sf-text-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sf-text-subtle">
                  Accuracy Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-sf-button" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sf-text-bold">-</div>
                <p className="text-xs text-sf-text-muted">
                  No data yet
                </p>
              </CardContent>
            </Card>

            <Card className="border-sf-text-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sf-text-subtle">
                  Learning Streak
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-sf-button" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sf-text-bold">0</div>
                <p className="text-xs text-sf-text-muted">
                  days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="border-sf-text-muted/20">
            <CardHeader>
              <CardTitle className="text-sf-text-bold">Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sf-text-subtle">
                  Welcome to OnushilonHub! Start your grammar learning journey by exploring our topics:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href="/get-started/modifier"
                    className="p-4 border border-sf-text-muted/20 rounded-lg hover:border-sf-button/50 transition-colors"
                  >
                    <h3 className="font-semibold text-sf-text-bold mb-2">Modifier</h3>
                    <p className="text-sm text-sf-text-subtle">
                      Learn pre-modifiers and post-modifiers
                    </p>
                  </a>
                  <a
                    href="/get-started/connectors"
                    className="p-4 border border-sf-text-muted/20 rounded-lg hover:border-sf-button/50 transition-colors"
                  >
                    <h3 className="font-semibold text-sf-text-bold mb-2">Connectors</h3>
                    <p className="text-sm text-sf-text-subtle">
                      Master linking words and phrases
                    </p>
                  </a>
                  <a
                    href="/get-started/completing-sentence"
                    className="p-4 border border-sf-text-muted/20 rounded-lg hover:border-sf-button/50 transition-colors"
                  >
                    <h3 className="font-semibold text-sf-text-bold mb-2">Completing Sentence</h3>
                    <p className="text-sm text-sf-text-subtle">
                      Practice sentence completion
                    </p>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}