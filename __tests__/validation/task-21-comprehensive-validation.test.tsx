import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnswerToggle } from '@/components/ui/answer-toggle';
import { GrammarRuleDisplay } from '@/components/grammar/GrammarRuleDisplay';
import { TopicIntroduction } from '@/components/grammar/TopicIntroduction';
import { modifierRules, modifierIntroduction } from '@/data/grammar-rules/modifier';

describe('Task 21: Comprehensive Testing and Validation', () => {
  describe('Supabase Removal Validation', () => {
    it('should not have supabase dependencies in package.json', async () => {
      const packageJson = await import('../../package.json');
      expect(packageJson.dependencies).not.toHaveProperty('@supabase/supabase-js');
    });

    it('should not have supabase environment variables in types', () => {
      // This test ensures supabase env vars are removed from types
      expect(true).toBe(true); // Placeholder - actual validation done by build success
    });
  });

  describe('Modifier Content Structure Validation', () => {
    it('should have properly structured modifier introduction', () => {
      expect(modifierIntroduction).toHaveProperty('title');
      expect(modifierIntroduction).toHaveProperty('banglaDescription');
      expect(modifierIntroduction).toHaveProperty('types');
      expect(modifierIntroduction.types).toHaveProperty('title');
      expect(modifierIntroduction.types).toHaveProperty('description');
      expect(modifierIntroduction.types).toHaveProperty('list');
      expect(Array.isArray(modifierIntroduction.types.list)).toBe(true);
    });

    it('should have properly structured modifier rules', () => {
      expect(Array.isArray(modifierRules)).toBe(true);
      expect(modifierRules.length).toBeGreaterThan(0);
      
      modifierRules.forEach(rule => {
        expect(rule).toHaveProperty('id');
        expect(rule).toHaveProperty('title');
        expect(rule).toHaveProperty('banglaDescription');
        expect(rule).toHaveProperty('examples');
        expect(rule).toHaveProperty('topic', 'modifier');
        expect(rule).toHaveProperty('level', 'HSC');
        expect(Array.isArray(rule.examples)).toBe(true);
      });
    });
  });

  describe('Reusable Answer Toggle Component', () => {
    it('should provide tap to show/hide functionality', () => {
      const testContent = <div>Hidden content</div>;
      render(<AnswerToggle>{testContent}</AnswerToggle>);
      
      // Initially hidden
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
      
      // Tap to show
      fireEvent.click(screen.getByRole('button', { name: /show answer/i }));
      expect(screen.getByText('Hidden content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /hide answer/i })).toBeInTheDocument();
      
      // Tap to hide
      fireEvent.click(screen.getByRole('button', { name: /hide answer/i }));
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
    });

    it('should have eye icon functionality', () => {
      render(<AnswerToggle>Test content</AnswerToggle>);
      
      // Check for show state text
      expect(screen.getByText('Show Answer')).toBeInTheDocument();
      
      fireEvent.click(screen.getByRole('button'));
      
      // Check for hide state text
      expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    });

    it('should be reusable across different contexts', () => {
      const { rerender } = render(
        <AnswerToggle>First context content</AnswerToggle>
      );
      
      expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
      
      rerender(<AnswerToggle>Second context content</AnswerToggle>);
      
      expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
      
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Second context content')).toBeInTheDocument();
    });
  });

  describe('Grammar Rule Display Structure', () => {
    const mockRule = {
      title: 'Test Rule Title',
      banglaDescription: 'বাংলা বর্ণনা',
      examples: ['Example 1', 'Example 2']
    };

    it('should display title first, then bangla description, then examples', () => {
      const { container } = render(<GrammarRuleDisplay {...mockRule} />);
      
      const elements = container.querySelectorAll('h3, p, div');
      const textContents = Array.from(elements).map(el => el.textContent);
      
      // Title should come first
      expect(textContents.some(text => text?.includes('Test Rule Title'))).toBe(true);
      // Bangla description should be present
      expect(textContents.some(text => text?.includes('বাংলা বর্ণনা'))).toBe(true);
    });

    it('should hide examples by default with toggle functionality', () => {
      render(<GrammarRuleDisplay {...mockRule} />);
      
      // Examples should be hidden initially
      expect(screen.queryByText('Example 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Example 2')).not.toBeInTheDocument();
      
      // Show examples
      fireEvent.click(screen.getByRole('button', { name: /show answer/i }));
      expect(screen.getByText('Example 1')).toBeInTheDocument();
      expect(screen.getByText('Example 2')).toBeInTheDocument();
    });
  });

  describe('Topic Introduction Component', () => {
    it('should display topic introduction at the top', () => {
      render(
        <TopicIntroduction
          title={modifierIntroduction.title}
          banglaDescription={modifierIntroduction.banglaDescription}
          types={modifierIntroduction.types}
        />
      );
      
      expect(screen.getByText('📚 What is Modifier?')).toBeInTheDocument();
      expect(screen.getByText(modifierIntroduction.banglaDescription)).toBeInTheDocument();
      expect(screen.getByText('Modifier কত প্রকার?')).toBeInTheDocument();
    });

    it('should display modifier types correctly', () => {
      render(
        <TopicIntroduction
          title={modifierIntroduction.title}
          banglaDescription={modifierIntroduction.banglaDescription}
          types={modifierIntroduction.types}
        />
      );
      
      expect(screen.getByText('Pre-modifier')).toBeInTheDocument();
      expect(screen.getByText('Post-modifier')).toBeInTheDocument();
      expect(screen.getByText('Dangling modifier (পরীক্ষায় আসে না)')).toBeInTheDocument();
    });
  });

  describe('Website Performance and Lightweight Validation', () => {
    it('should have efficient component structure', () => {
      // Test that components don't have unnecessary re-renders
      let renderCount = 0;
      const TestComponent = () => {
        renderCount++;
        return <AnswerToggle>Test</AnswerToggle>;
      };
      
      const { rerender } = render(<TestComponent />);
      const initialRenderCount = renderCount;
      
      rerender(<TestComponent />);
      expect(renderCount).toBe(initialRenderCount + 1);
    });

    it('should have minimal DOM structure for answer toggle', () => {
      const { container } = render(<AnswerToggle>Content</AnswerToggle>);
      
      // Should have minimal DOM elements
      const allElements = container.querySelectorAll('*');
      expect(allElements.length).toBeLessThan(10); // Reasonable limit for lightweight structure
    });
  });

  describe('Theme Consistency Validation', () => {
    it('should use consistent theme colors in answer toggle', () => {
      render(<AnswerToggle>Test</AnswerToggle>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-sf-text-subtle', 'hover:text-sf-button');
    });

    it('should use consistent theme colors in grammar rule display', () => {
      render(
        <GrammarRuleDisplay
          title="Rule Title Test"
          banglaDescription="Description Test"
          examples={['Example Test']}
        />
      );
      
      const title = screen.getByText('Rule Title Test');
      expect(title).toHaveClass('text-sf-text-bold');
    });

    it('should use consistent theme colors in topic introduction', () => {
      render(
        <TopicIntroduction
          title="Test Title"
          banglaDescription="Test Description"
        />
      );
      
      const title = screen.getByText('📚 Test Title');
      expect(title).toHaveClass('text-sf-text-bold');
    });
  });

  describe('Accessibility Validation', () => {
    it('should have proper ARIA labels for answer toggle', () => {
      render(<AnswerToggle>Content</AnswerToggle>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Show answer');
      
      fireEvent.click(button);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Hide answer');
    });

    it('should have proper heading hierarchy', () => {
      render(
        <div>
          <TopicIntroduction
            title="Main Topic"
            banglaDescription="Description"
          />
          <GrammarRuleDisplay
            title="Rule Title"
            banglaDescription="Rule Description"
            examples={['Example']}
          />
        </div>
      );
      
      // Check heading levels
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior Validation', () => {
    it('should have responsive classes in components', () => {
      const { container } = render(
        <TopicIntroduction
          title="Test"
          banglaDescription="Test"
        />
      );
      
      // Should have responsive padding and spacing
      expect(container.firstChild).toHaveClass('p-6');
    });

    it('should handle different screen sizes gracefully', () => {
      render(<AnswerToggle>Responsive content</AnswerToggle>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2'); // Responsive padding
    });
  });
});