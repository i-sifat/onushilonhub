import { render, screen } from '@testing-library/react';
import { ContentBox } from '@/components/ui/content-box';
import GrammarRuleCard from '@/components/grammar/GrammarRuleCard';

describe('Content Box Enhancement Validation', () => {
  describe('Requirement 14.1: ContentBox component with rounded corners for better visual appeal', () => {
    it('should have rounded corners styling', () => {
      const { container } = render(
        <ContentBox
          type="structure"
          content="Test content"
        />
      );

      const contentBox = container.firstChild as HTMLElement;
      expect(contentBox).toHaveClass('rounded-2xl');
    });

    it('should have visual appeal enhancements like backdrop blur and hover effects', () => {
      const { container } = render(
        <ContentBox
          type="example"
          content="Test content"
        />
      );

      const contentBox = container.firstChild as HTMLElement;
      expect(contentBox).toHaveClass('backdrop-blur-sm');
      expect(contentBox).toHaveClass('hover:shadow-lg');
    });
  });

  describe('Requirement 14.2: Better typography and readability for content boxes', () => {
    it('should use proper typography for structure content with monospace font', () => {
      render(
        <ContentBox
          type="structure"
          content="Subject + Verb + Object"
        />
      );

      const contentElement = screen.getByText('Subject + Verb + Object');
      expect(contentElement.className).toContain('font-mono');
      expect(contentElement.className).toContain('text-sm');
      expect(contentElement.className).toContain('leading-relaxed');
    });

    it('should use proper typography for example content without monospace font', () => {
      render(
        <ContentBox
          type="example"
          content="I am reading a book."
        />
      );

      const contentElement = screen.getByText('I am reading a book.');
      expect(contentElement.className).not.toContain('font-mono');
      expect(contentElement.className).toContain('text-sm');
      expect(contentElement.className).toContain('leading-relaxed');
    });

    it('should have proper spacing for readability', () => {
      render(
        <ContentBox
          type="example"
          title="Test Title"
          content={['First line', 'Second line']}
        />
      );

      const contentContainer = screen.getByText('First line').parentElement;
      expect(contentContainer).toHaveClass('space-y-3');
    });
  });

  describe('Requirement 14.3: Remove duplicated data boxes and consolidate similar content', () => {
    it('should use single ContentBox component for structures in GrammarRuleCard', () => {
      const mockRule = {
        id: 1,
        title: 'Test Rule',
        description: 'Test description',
        structures: ['Structure 1', 'Structure 2'],
        examples: ['Example 1', 'Example 2']
      };

      render(<GrammarRuleCard {...mockRule} />);

      // Should have one Structures section using ContentBox
      expect(screen.getByText('Structures')).toBeInTheDocument();
      expect(screen.getByText('🏗️')).toBeInTheDocument(); // Structure icon
      
      // Should have one Examples section using ContentBox
      expect(screen.getByText('Examples')).toBeInTheDocument();
      expect(screen.getByText('💡')).toBeInTheDocument(); // Example icon
    });

    it('should consolidate multiple content items into single ContentBox', () => {
      const multipleContent = [
        'First structure: Subject + Verb',
        'Second structure: Subject + Verb + Object',
        'Third structure: Subject + Auxiliary + Verb'
      ];

      render(
        <ContentBox
          type="structure"
          content={multipleContent}
        />
      );

      // All content should be in one consolidated box
      multipleContent.forEach(content => {
        expect(screen.getByText(content)).toBeInTheDocument();
      });

      // Should only have one title/header
      const structureHeaders = screen.getAllByText('Structure');
      expect(structureHeaders).toHaveLength(1);
    });
  });

  describe('Requirement 14.4: Consistent styling across all Structure and Examples displays', () => {
    it('should apply consistent border colors for structure type', () => {
      const { container } = render(
        <ContentBox
          type="structure"
          content="Test structure"
        />
      );

      const contentBox = container.firstChild as HTMLElement;
      expect(contentBox).toHaveClass('border-sf-button');
      expect(contentBox).toHaveClass('bg-sf-button/5');
      expect(contentBox).toHaveClass('hover:border-sf-button/50');
    });

    it('should apply consistent border colors for example type', () => {
      const { container } = render(
        <ContentBox
          type="example"
          content="Test example"
        />
      );

      const contentBox = container.firstChild as HTMLElement;
      expect(contentBox).toHaveClass('border-sf-highlight');
      expect(contentBox).toHaveClass('bg-sf-highlight/5');
      expect(contentBox).toHaveClass('hover:border-sf-highlight/50');
    });

    it('should apply consistent border colors for tip type', () => {
      const { container } = render(
        <ContentBox
          type="tip"
          content="Test tip"
        />
      );

      const contentBox = container.firstChild as HTMLElement;
      expect(contentBox).toHaveClass('border-blue-500');
      expect(contentBox).toHaveClass('bg-blue-500/5');
      expect(contentBox).toHaveClass('hover:border-blue-500/50');
    });

    it('should have consistent transition animations', () => {
      const { container } = render(
        <ContentBox
          type="structure"
          content="Test content"
        />
      );

      const contentBox = container.firstChild as HTMLElement;
      expect(contentBox).toHaveClass('transition-all');
      expect(contentBox).toHaveClass('duration-300');
    });
  });

  describe('Requirement 14.5: Clear visual hierarchy in content presentation', () => {
    it('should have clear hierarchy with title, icon, and content', () => {
      render(
        <ContentBox
          type="structure"
          title="Custom Structure Title"
          content="Test structure content"
        />
      );

      // Title should be prominent
      const title = screen.getByText('Custom Structure Title');
      expect(title).toHaveClass('text-lg');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('text-sf-text-bold');

      // Icon should be present and properly sized
      const icon = screen.getByText('🏗️');
      expect(icon).toHaveClass('text-xl');

      // Content should be properly styled
      const content = screen.getByText('Test structure content');
      expect(content).toHaveClass('text-sf-text-subtle');
    });

    it('should have proper spacing hierarchy between elements', () => {
      render(
        <ContentBox
          type="example"
          title="Test Title"
          content="Test content"
        />
      );

      // Header should have proper padding
      const title = screen.getByText('Test Title');
      const headerContainer = title.closest('[class*="px-6"]');
      expect(headerContainer).toHaveClass('px-6');
      expect(headerContainer).toHaveClass('pt-6');
      expect(headerContainer).toHaveClass('pb-2');

      // Content should have proper padding
      const content = screen.getByText('Test content');
      const contentContainer = content.closest('[class*="px-6"]');
      expect(contentContainer).toHaveClass('px-6');
      expect(contentContainer).toHaveClass('pb-6');
    });

    it('should use default titles when none provided for clear hierarchy', () => {
      render(
        <ContentBox
          type="structure"
          content="Test content"
        />
      );

      expect(screen.getByText('Structure')).toBeInTheDocument();
    });

    it('should support hiding icons while maintaining hierarchy', () => {
      render(
        <ContentBox
          type="example"
          title="Test Title"
          content="Test content"
          showIcon={false}
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.queryByText('💡')).not.toBeInTheDocument();
    });
  });
});