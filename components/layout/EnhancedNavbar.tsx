'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Menu, X, Sparkles } from 'lucide-react';

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/get-started', label: 'Get Started' },
    { href: '/board-questions', label: 'Practice Questions' },
    { href: '/grammar-items', label: 'Grammar Rules' },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 w-full bg-sf-bg/95 backdrop-blur-md z-50 transition-all duration-300 border-b border-sf-text-muted/10 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-sf-button hover:text-sf-button/80 transition-all duration-300 group"
          >
            <div className="relative">
              <GraduationCap className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-sf-highlight animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sf-button to-sf-highlight bg-clip-text text-transparent">
              OnushilonHub
            </span>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sf-text-subtle hover:text-sf-button transition-all duration-300 font-medium rounded-lg hover:bg-sf-button/5 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-sf-button transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/get-started"
              className="bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/25 hover:scale-105 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Learning</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sf-text-subtle hover:text-sf-button transition-colors p-2 rounded-lg hover:bg-sf-button/5"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 bg-sf-bg/95 backdrop-blur-md rounded-lg mt-2 border border-sf-text-muted/10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sf-text-subtle hover:text-sf-button hover:bg-sf-button/5 transition-all duration-300 font-medium rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-sf-text-muted/10">
                <Link
                  href="/get-started"
                  className="block bg-sf-button hover:bg-sf-button/90 text-sf-bg px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}