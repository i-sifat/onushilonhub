import { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TestHistoryPage from '@/components/test/TestHistoryPage';

export const metadata: Metadata = {
  title: 'Test History | OnushilonHub',
  description: 'View your test history, analytics, and performance trends.',
};

export default function TestHistoryPageRoute() {
  return (
    <ProtectedRoute>
      <TestHistoryPage />
    </ProtectedRoute>
  );
}