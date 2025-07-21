import { Navbar, Footer } from '@/components/layout';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-sf-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}