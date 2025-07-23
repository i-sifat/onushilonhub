import { Footer } from '@/components/layout';
import EnhancedNavbar from '@/components/layout/EnhancedNavbar';
import StudentFriendlyHomepage from '@/components/StudentFriendlyHomepage';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-sf-bg">
      <EnhancedNavbar />
      <main>
        <StudentFriendlyHomepage />
      </main>
      <Footer />
    </div>
  );
}