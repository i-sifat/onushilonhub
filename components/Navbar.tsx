'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/chapters', label: 'Chapters' },
    { 
      href: '/board-questions', 
      label: 'Board Questions',
      submenu: [
        { href: '/board-questions/hsc', label: 'HSC Questions' },
        { href: '/board-questions/ssc', label: 'SSC Questions' }
      ]
    },
    { 
      href: '/rules', 
      label: 'Rules',
      submenu: [
        { href: '/rules/hsc', label: 'HSC Rules' },
        { href: '/rules/ssc', label: 'SSC Rules' }
      ]
    },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down & past 100px
          setIsVisible(false);
        } else {
          // Scrolling up
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
      className={`fixed top-0 w-full bg-sf-bg z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-sf-button hover:text-sf-button/80 transition-colors">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">OnushilonHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="text-sf-text-subtle hover:text-sf-button transition-colors font-medium"
                >
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-sf-bg border border-sf-text-muted/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block px-4 py-2 text-sf-text-subtle hover:text-sf-button hover:bg-sf-text-muted/10 transition-colors"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sf-text-subtle hover:text-sf-button transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-sf-button hover:bg-sf-button/90 text-sf-bg px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sf-text-subtle hover:text-sf-button transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-sf-bg rounded-lg mt-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-sf-text-subtle hover:text-sf-button transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.submenu && (
                    <div className="ml-4 space-y-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block px-3 py-2 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-sf-text-muted/20 pt-3 mt-3">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-sf-text-subtle hover:text-sf-button transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block mx-3 mt-2 bg-sf-button hover:bg-sf-button/90 text-sf-bg px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}