import React from 'react';
import { render, screen } from '@testing-library/react';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';

describe('SafeAreaWrapper', () => {
  it('renders children correctly', () => {
    render(
      <SafeAreaWrapper>
        <div>Test content</div>
      </SafeAreaWrapper>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default padding classes', () => {
    const { container } = render(
      <SafeAreaWrapper>
        <div>Test content</div>
      </SafeAreaWrapper>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('px-4', 'py-6', 'sm:px-6', 'sm:py-8', 'lg:px-8', 'lg:py-12');
  });

  it('applies compact variant padding classes', () => {
    const { container } = render(
      <SafeAreaWrapper variant="compact">
        <div>Test content</div>
      </SafeAreaWrapper>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('px-4', 'py-4', 'sm:px-6', 'sm:py-6', 'lg:px-8', 'lg:py-8');
  });

  it('applies spacious variant padding classes', () => {
    const { container } = render(
      <SafeAreaWrapper variant="spacious">
        <div>Test content</div>
      </SafeAreaWrapper>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('px-6', 'py-8', 'sm:px-8', 'sm:py-10', 'lg:px-12', 'lg:py-16');
  });

  it('applies custom className along with variant classes', () => {
    const { container } = render(
      <SafeAreaWrapper className="custom-class">
        <div>Test content</div>
      </SafeAreaWrapper>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class', 'px-4', 'py-6', 'sm:px-6', 'sm:py-8', 'lg:px-8', 'lg:py-12');
  });
});