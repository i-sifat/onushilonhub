import { render, screen } from '@testing-library/react';
import { ContentBox } from '@/components/ui/content-box';

describe('ContentBox', () => {
  it('renders structure type with correct styling and icon', () => {
    render(
      <ContentBox
        type="structure"
        title="Test Structure"
        content="Subject + Verb + Object"
      />
    );

    expect(screen.getByText('🏗️')).toBeInTheDocument();
    expect(screen.getByText('Test Structure')).toBeInTheDocument();
    expect(screen.getByText('Subject + Verb + Object')).toBeInTheDocument();
  });

  it('renders example type with correct styling and icon', () => {
    render(
      <ContentBox
        type="example"
        title="Test Example"
        content="I am reading a book."
      />
    );

    expect(screen.getByText('💡')).toBeInTheDocument();
    expect(screen.getByText('Test Example')).toBeInTheDocument();
    expect(screen.getByText('I am reading a book.')).toBeInTheDocument();
  });

  it('renders tip type with correct styling and icon', () => {
    render(
      <ContentBox
        type="tip"
        title="Test Tip"
        content="Remember to use proper punctuation."
      />
    );

    expect(screen.getByText('💡')).toBeInTheDocument();
    expect(screen.getByText('Test Tip')).toBeInTheDocument();
    expect(screen.getByText('Remember to use proper punctuation.')).toBeInTheDocument();
  });

  it('renders array content correctly', () => {
    const content = [
      'First structure: Subject + Verb',
      'Second structure: Subject + Verb + Object'
    ];

    render(
      <ContentBox
        type="structure"
        title="Multiple Structures"
        content={content}
      />
    );

    expect(screen.getByText('First structure: Subject + Verb')).toBeInTheDocument();
    expect(screen.getByText('Second structure: Subject + Verb + Object')).toBeInTheDocument();
  });

  it('uses default title when none provided', () => {
    render(
      <ContentBox
        type="structure"
        content="Test content"
      />
    );

    expect(screen.getByText('Structure')).toBeInTheDocument();
  });

  it('hides icon when showIcon is false', () => {
    render(
      <ContentBox
        type="structure"
        title="Test Structure"
        content="Test content"
        showIcon={false}
      />
    );

    expect(screen.queryByText('🏗️')).not.toBeInTheDocument();
    expect(screen.getByText('Test Structure')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ContentBox
        type="example"
        content="Test content"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies correct font styling for structure type', () => {
    render(
      <ContentBox
        type="structure"
        content="Subject + Verb + Object"
      />
    );

    const contentElement = screen.getByText('Subject + Verb + Object');
    expect(contentElement).toHaveClass('font-mono');
  });

  it('applies correct font styling for example type', () => {
    render(
      <ContentBox
        type="example"
        content="I am reading a book."
      />
    );

    const contentElement = screen.getByText('I am reading a book.');
    expect(contentElement).not.toHaveClass('font-mono');
  });
});