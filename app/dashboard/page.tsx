import { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useProgress } from '@/hooks/useProgress';
import StatsOverview from '@/components/progress/StatsOverview';
import ProgressCard from '@/components/progress/ProgressCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

function DashboardContent() {
  const { userStats, topicProgress, loading } = useProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-sf-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-sf-text-muted/20 rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-sf-text-muted/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
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

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview stats={userStats} />
        </div>

        {/* Topic Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-sf-text-bold">Topic Progress</h2>
            <Link 
              href="/get-started"
              className="text-sf-button hover:text-sf-button/80 transition-colors"
            >
              Start Learning →
            </Link>
          </div>
          
          {topicProgress.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topicProgress.map((progress) => (
                <ProgressCard 
                  key={`${progress.topic_name}-${progress.level}`}
                  progress={progress}
                  onClick={() => {
                    // Navigate to topic page
                    window.location.href = `/get-started/${progress.topic_name}`;
                  }}
                />
              ))}
            </div>
          ) : (
            <Card className="border-sf-text-muted/20">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sf-text-bold mb-2">
                  Start Your Learning Journey
                </h3>
                <p className="text-sf-text-subtle mb-6">
                  You haven't started practicing any topics yet. Begin with any grammar topic to see your progress here.
                </p>
                <Link
                  href="/get-started"
                  className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Get Started
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/get-started/modifier">
              <Card className="border-sf-text-muted/20 hover:border-sf-button/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-sf-button/20 rounded-lg">
                      <BookOpen className="h-6 w-6 text-sf-button" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sf-text-bold">Practice Modifier</h3>
                      <p className="text-sm text-sf-text-subtle">Learn pre and post modifiers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/get-started/connectors">
              <Card className="border-sf-text-muted/20 hover:border-sf-button/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-sf-button/20 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-sf-button" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sf-text-bold">Practice Connectors</h3>
                      <p className="text-sm text-sf-text-subtle">Master linking words</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/get-started/completing-sentence">
              <Card className="border-sf-text-muted/20 hover:border-sf-button/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-sf-button/20 rounded-lg">
                      <Clock className="h-6 w-6 text-sf-button" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sf-text-bold">Completing Sentence</h3>
                      <p className="text-sm text-sf-text-subtle">Practice sentence completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  title: 'Dashboard | OnushilonHub',
  description: 'Track your grammar learning progress and performance.',
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}