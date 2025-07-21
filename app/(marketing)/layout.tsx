import { Navbar, Footer } from '@/components/layout';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sf-bg">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}