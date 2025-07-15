import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sf-bg border-t border-sf-text-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-sf-button" />
              <span className="text-xl font-bold text-sf-text-bold">OnushilonHub</span>
            </div>
            <p className="text-sf-text-subtle max-w-md">
              Excel in HSC & SSC Grammar with Smart, Strategic Learning. 
              Your success is our mission.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sf-text-bold font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sf-text-subtle hover:text-sf-button transition-colors">About Us</Link>
              <Link href="/chapters" className="block text-sf-text-subtle hover:text-sf-button transition-colors">Chapters</Link>
              <Link href="/board-questions" className="block text-sf-text-subtle hover:text-sf-button transition-colors">Board Questions</Link>
              <Link href="/rules" className="block text-sf-text-subtle hover:text-sf-button transition-colors">Rules</Link>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sf-text-bold font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sf-text-subtle hover:text-sf-button transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sf-text-subtle hover:text-sf-button transition-colors">Terms of Service</Link>
              <Link href="/contact" className="block text-sf-text-subtle hover:text-sf-button transition-colors">Contact</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-sf-text-muted/20 mt-8 pt-8 text-center">
          <p className="text-sf-text-muted">© 2024 OnushilonHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}