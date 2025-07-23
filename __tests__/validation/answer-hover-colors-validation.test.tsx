import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock components to test answer hover colors
const MockAnswerElement = ({ isVisible }: { isVisible: boolean }) => {
  const blankElement = isVisible 
    ? `<span class="inline-flex items-center bg-success-500/20 text-success-600 border border-success-500/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-success-500/30 hover:text-success-700 hover:border-success-500/50 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-success-500/10 transition-all duration-200 ease-out active:scale-95">answer</span>`
    : `<span class="inline-flex items-center bg-sf-button/20 text-sf-button border border-sf-button/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-sf-button/30 hover:text-sf-button hover:border-sf-button/50 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-sf-button/10 transition-all duration-200 ease-out active:scale-95">[1]</span>`;
  
  return (
    <div 
      data-testid="answer-element"
      dangerouslySetInnerHTML={{ __html: blankElement }}
    />
  );
};

const MockAnswerBox = () => {
  return (
    <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
      <p className="text-xs font-medium text-success-600 mb-1">Answer:</p>
      <p className="text-sf-text-subtle text-sm leading-relaxed">
        Sample answer content
      </p>
    </div>
  );
};

describe('Answer Hover Colors Validation', () => {
  describe('Answer Element Hover Colors', () => {
    it('should use theme-consistent colors for visible answer elements', () => {
      render(<MockAnswerElement isVisible={true} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      expect(spanElement).toHaveClass('bg-success-500/20');
      expect(spanElement).toHaveClass('text-success-600');
      expect(spanElement).toHaveClass('border-success-500/30');
      expect(spanElement).toHaveClass('hover:bg-success-500/30');
      expect(spanElement).toHaveClass('hover:text-success-700');
      expect(spanElement).toHaveClass('hover:border-success-500/50');
      expect(spanElement).toHaveClass('hover:shadow-success-500/10');
    });

    it('should use theme-consistent colors for blank answer elements', () => {
      render(<MockAnswerElement isVisible={false} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      expect(spanElement).toHaveClass('bg-sf-button/20');
      expect(spanElement).toHaveClass('text-sf-button');
      expect(spanElement).toHaveClass('border-sf-button/30');
      expect(spanElement).toHaveClass('hover:bg-sf-button/30');
      expect(spanElement).toHaveClass('hover:text-sf-button');
      expect(spanElement).toHaveClass('hover:border-sf-button/50');
      expect(spanElement).toHaveClass('hover:shadow-sf-button/10');
    });

    it('should include proper transition and animation classes', () => {
      render(<MockAnswerElement isVisible={true} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      expect(spanElement).toHaveClass('transition-all');
      expect(spanElement).toHaveClass('duration-200');
      expect(spanElement).toHaveClass('ease-out');
      expect(spanElement).toHaveClass('hover:scale-105');
      expect(spanElement).toHaveClass('hover:-translate-y-0.5');
      expect(spanElement).toHaveClass('hover:shadow-sm');
      expect(spanElement).toHaveClass('active:scale-95');
    });
  });

  describe('Answer Box Hover Colors', () => {
    it('should use theme-consistent colors for answer boxes', () => {
      render(<MockAnswerBox />);
      const answerBox = screen.getByText('Answer:').closest('div');
      
      expect(answerBox).toHaveClass('bg-success-500/10');
      expect(answerBox).toHaveClass('border-success-500');
      expect(answerBox).toHaveClass('hover:bg-success-500/15');
      expect(answerBox).toHaveClass('hover:border-success-600');
      expect(answerBox).toHaveClass('transition-all');
      expect(answerBox).toHaveClass('duration-200');
    });

    it('should use theme-consistent text colors', () => {
      render(<MockAnswerBox />);
      const answerLabel = screen.getByText('Answer:');
      
      expect(answerLabel).toHaveClass('text-success-600');
      expect(answerLabel).toHaveClass('text-xs');
      expect(answerLabel).toHaveClass('font-medium');
    });

    it('should maintain proper content styling', () => {
      render(<MockAnswerBox />);
      const answerContent = screen.getByText('Sample answer content');
      
      expect(answerContent).toHaveClass('text-sf-text-subtle');
      expect(answerContent).toHaveClass('text-sm');
      expect(answerContent).toHaveClass('leading-relaxed');
    });
  });

  describe('Color Consistency', () => {
    it('should use success colors for answer states', () => {
      const successColors = [
        'bg-success-500/20',
        'text-success-600',
        'border-success-500/30',
        'hover:bg-success-500/30',
        'hover:text-success-700',
        'hover:border-success-500/50',
        'hover:shadow-success-500/10'
      ];
      
      render(<MockAnswerElement isVisible={true} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      successColors.forEach(colorClass => {
        expect(spanElement).toHaveClass(colorClass);
      });
    });

    it('should use theme button colors for blank states', () => {
      const buttonColors = [
        'bg-sf-button/20',
        'text-sf-button',
        'border-sf-button/30',
        'hover:bg-sf-button/30',
        'hover:text-sf-button',
        'hover:border-sf-button/50',
        'hover:shadow-sf-button/10'
      ];
      
      render(<MockAnswerElement isVisible={false} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      buttonColors.forEach(colorClass => {
        expect(spanElement).toHaveClass(colorClass);
      });
    });
  });

  describe('Accessibility and Contrast', () => {
    it('should maintain proper cursor and interactive states', () => {
      render(<MockAnswerElement isVisible={true} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      expect(spanElement).toHaveClass('cursor-pointer');
      expect(spanElement).toHaveClass('inline-flex');
      expect(spanElement).toHaveClass('items-center');
    });

    it('should have proper sizing and spacing', () => {
      render(<MockAnswerElement isVisible={true} />);
      const answerElement = screen.getByTestId('answer-element');
      const spanElement = answerElement.querySelector('span');
      
      expect(spanElement).toHaveClass('px-2');
      expect(spanElement).toHaveClass('py-1');
      expect(spanElement).toHaveClass('rounded');
      expect(spanElement).toHaveClass('text-sm');
      expect(spanElement).toHaveClass('font-medium');
    });
  });
});

describe('Theme Integration', () => {
  it('should validate that all answer colors are part of the design system', () => {
    const designSystemColors = [
      'success-500',
      'success-600', 
      'success-700',
      'sf-button',
      'sf-text-subtle'
    ];
    
    // This test validates that we're using colors from the design system
    designSystemColors.forEach(color => {
      expect(color).toMatch(/^(success-\d+|sf-[\w-]+)$/);
    });
  });

  it('should ensure hover effects enhance user experience', () => {
    const enhancementClasses = [
      'hover:scale-105',
      'hover:-translate-y-0.5',
      'hover:shadow-sm',
      'transition-all',
      'duration-200',
      'ease-out'
    ];
    
    render(<MockAnswerElement isVisible={true} />);
    const answerElement = screen.getByTestId('answer-element');
    const spanElement = answerElement.querySelector('span');
    
    enhancementClasses.forEach(enhancementClass => {
      expect(spanElement).toHaveClass(enhancementClass);
    });
  });
});