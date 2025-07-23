import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentFriendlyHomepage from '@/components/StudentFriendlyHomepage';
import EnhancedNavbar from '@/components/layout/EnhancedNavbar';
import DynamicTextRotator from '@/components/ui/dynamic-text-rotator';
import EnhancedHeroStatsCard from '@/components/EnhancedHeroStatsCard';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock react-countup
jest.mock('react-countup', () => {
  return function MockCountUp({ end, suffix }: { end: number; suffix: string }) {
    return <span>{end}{suffix}</span>;
  };
});

// Mock react-simple-typewriter
jest.mock('react-simple-typewriter', () => ({
  Typewriter: ({ words }: { words: string[] }) => <span>{words[0]}</span>
}));

describe('Homepage Renovation - Task 20 Validation', () => {
  describe('Requirement 15.1: StudentFriendlyHomepage component with modern layout', () => {
    it('should render StudentFriendlyHomepage component with modern layout structure', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for main container with gradient background
      const mainContainer = document.querySelector('.min-h-screen.bg-gradient-to-br');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-br');
      
      // Check for grid layout structure
      const gridContainer = document.querySelector('.grid.lg\\:grid-cols-2');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('lg:grid-cols-2');
      
      // Check for decorative background elements
      expect(document.querySelector('.absolute.inset-0.overflow-hidden')).toBeInTheDocument();
    });

    it('should have proper responsive layout structure', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for responsive container
      const container = screen.getByText('Learn Grammar the').closest('.container');
      expect(container).toHaveClass('mx-auto', 'px-6');
      
      // Check for responsive grid
      const grid = screen.getByText('Learn Grammar the').closest('.grid');
      expect(grid).toHaveClass('lg:grid-cols-2', 'gap-12', 'items-center');
    });
  });

  describe('Requirement 15.2: Maintain current color theme with engaging styling', () => {
    it('should use sf-* color variables throughout the design', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check main heading uses theme colors
      const heading = screen.getByText('Smart Way');
      expect(heading).toHaveClass('bg-gradient-to-r', 'from-sf-button', 'via-sf-highlight', 'to-sf-button');
      
      // Check CTA button exists and has proper structure
      const ctaButtons = screen.getAllByText('Get Started');
      const ctaButton = ctaButtons.find(button => 
        button.closest('a')?.getAttribute('href') === '/get-started' &&
        button.closest('.bg-sf-button')
      )?.closest('a');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '/get-started');
      
      // Check secondary button exists and has proper structure
      const secondaryButtons = screen.getAllByText('Practice Questions');
      const secondaryButton = secondaryButtons.find(button => 
        button.closest('a')?.getAttribute('href') === '/board-questions'
      )?.closest('a');
      expect(secondaryButton).toBeInTheDocument();
      expect(secondaryButton).toHaveAttribute('href', '/board-questions');
    });

    it('should maintain consistent theme colors in feature cards', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check feature cards use theme colors
      const featureCards = document.querySelectorAll('.bg-neutral-800\\/50');
      expect(featureCards.length).toBeGreaterThan(0);
      
      featureCards.forEach(card => {
        expect(card).toHaveClass('border-sf-text-muted/20', 'hover:border-sf-button/30');
      });
    });
  });

  describe('Requirement 15.3: Dynamic text content on left side that appeals to students', () => {
    it('should display engaging main heading for students', () => {
      render(<StudentFriendlyHomepage />);
      
      expect(screen.getByText('Learn Grammar the')).toBeInTheDocument();
      expect(screen.getByText('Smart Way')).toBeInTheDocument();
      expect(screen.getByText(/Free, comprehensive HSC & SSC grammar resources/)).toBeInTheDocument();
    });

    it('should include DynamicTextRotator with student-appealing messages', () => {
      const dynamicTexts = [
        "🎓 Your journey to academic excellence starts here",
        "📖 Master HSC & SSC grammar with confidence",
        "🚀 Join thousands of successful students"
      ];
      
      render(<DynamicTextRotator texts={dynamicTexts} />);
      
      // Should render the first text initially
      expect(screen.getByText(dynamicTexts[0])).toBeInTheDocument();
    });

    it('should display student-focused feature highlights', () => {
      render(<StudentFriendlyHomepage />);
      
      expect(screen.getByText('500+ Practice Questions')).toBeInTheDocument();
      expect(screen.getByText('Real board questions from previous years')).toBeInTheDocument();
      expect(screen.getByText('Smart Learning Path')).toBeInTheDocument();
      expect(screen.getByText('Student Community')).toBeInTheDocument();
    });

    it('should include trust indicators that appeal to students', () => {
      render(<StudentFriendlyHomepage />);
      
      expect(screen.getByText('100% Free')).toBeInTheDocument();
      expect(screen.getByText('1000+ Students')).toBeInTheDocument();
      expect(screen.getByText('98% Success Rate')).toBeInTheDocument();
    });
  });

  describe('Requirement 15.4: Enlarge and enhance animated card display on right side', () => {
    it('should render EnhancedHeroStatsCard with larger dimensions', () => {
      render(<EnhancedHeroStatsCard />);
      
      // Check for larger card container
      const cardContainer = document.querySelector('.max-w-lg');
      expect(cardContainer).toBeInTheDocument();
      expect(cardContainer).toHaveClass('min-h-[500px]');
    });

    it('should include enhanced animations and effects', () => {
      render(<EnhancedHeroStatsCard />);
      
      // Check for enhanced animation classes
      const cardContainer = document.querySelector('.hover\\:scale-105');
      expect(cardContainer).toBeInTheDocument();
      expect(cardContainer).toHaveClass('hover:shadow-3xl', 'hover:rotate-1');
      
      // Check for floating particles
      const particles = document.querySelectorAll('.animate-ping');
      expect(particles.length).toBeGreaterThan(0);
    });

    it('should display enhanced statistics with better visual appeal', () => {
      render(<EnhancedHeroStatsCard />);
      
      // Check for enhanced stats display
      expect(screen.getByText('Practice Questions')).toBeInTheDocument();
      expect(screen.getByText('Grammar Rules')).toBeInTheDocument();
      expect(screen.getByText('Happy Students')).toBeInTheDocument();
      expect(screen.getByText('Success Rate')).toBeInTheDocument();
    });

    it('should include glow effect behind the card', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for glow effect container
      const glowEffect = document.querySelector('.bg-sf-button\\/20.rounded-3xl.blur-2xl');
      expect(glowEffect).toBeInTheDocument();
      expect(glowEffect).toHaveClass('scale-110', 'animate-pulse');
    });
  });

  describe('Requirement 15.5: Update navigation bar with better visual and UX design', () => {
    it('should render EnhancedNavbar with improved styling', () => {
      render(<EnhancedNavbar />);
      
      // Check for enhanced navbar container
      const navbar = document.querySelector('nav');
      expect(navbar).toHaveClass('bg-sf-bg/95', 'backdrop-blur-md', 'border-b');
      
      // Check for enhanced logo with gradient
      const logo = screen.getByText('OnushilonHub');
      expect(logo).toHaveClass('bg-gradient-to-r', 'from-sf-button', 'to-sf-highlight');
    });

    it('should include enhanced navigation links with hover effects', () => {
      render(<EnhancedNavbar />);
      
      // Check for navigation links with proper structure
      const navLinks = screen.getAllByText('Get Started');
      const navLink = navLinks.find(link => 
        link.closest('a')?.getAttribute('href') === '/get-started' &&
        !link.closest('.bg-sf-button')
      )?.closest('a');
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', '/get-started');
    });

    it('should include enhanced CTA button in navigation', () => {
      render(<EnhancedNavbar />);
      
      const ctaButtons = screen.getAllByText('Get Started');
      const ctaButton = ctaButtons.find(button => 
        button.closest('a')?.getAttribute('href') === '/get-started' &&
        button.closest('.bg-sf-button')
      )?.closest('a');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '/get-started');
    });
  });

  describe('Requirement 15.6: Convey non-organizational, free learning vibe', () => {
    it('should emphasize free learning throughout the design', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for free learning messaging
      expect(screen.getByText(/Free, comprehensive/)).toBeInTheDocument();
      expect(screen.getByText('100% Free')).toBeInTheDocument();
      expect(screen.getByText(/No registration required/)).toBeInTheDocument();
    });

    it('should use student-friendly language and emojis', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for student-friendly messaging
      expect(screen.getByText(/designed by students, for students/)).toBeInTheDocument();
      expect(screen.getByText(/Join the community of students/)).toBeInTheDocument();
      
      // Check for emojis in dynamic text (would be in the component)
      const dynamicTextContainer = document.querySelector('.bg-sf-button\\/10');
      expect(dynamicTextContainer).toBeInTheDocument();
    });

    it('should avoid corporate/institutional language', () => {
      render(<StudentFriendlyHomepage />);
      
      // Should not contain formal institutional language
      expect(screen.queryByText(/institution/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/organization/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/official/i)).not.toBeInTheDocument();
      
      // Should use casual, friendly language
      expect(screen.getByText(/Smart Way/)).toBeInTheDocument();
      expect(screen.getByText(/Get Started/)).toBeInTheDocument();
    });

    it('should include community and collaborative elements', () => {
      render(<StudentFriendlyHomepage />);
      
      expect(screen.getByText('Student Community')).toBeInTheDocument();
      expect(screen.getByText('Learn together, succeed together')).toBeInTheDocument();
      expect(screen.getByText(/Join the community/)).toBeInTheDocument();
    });
  });

  describe('Overall Integration and User Experience', () => {
    it('should render complete homepage without errors', () => {
      expect(() => render(<StudentFriendlyHomepage />)).not.toThrow();
    });

    it('should have proper accessibility attributes', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for proper heading hierarchy
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      
      // Check for proper link accessibility
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should maintain responsive design principles', () => {
      render(<StudentFriendlyHomepage />);
      
      // Check for responsive classes
      const responsiveElements = document.querySelectorAll('.sm\\:text-5xl, .lg\\:text-6xl, .sm\\:flex-row');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });
  });
});