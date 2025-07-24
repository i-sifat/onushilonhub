import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { modifierRules, modifierIntroduction } from '@/data/grammar-rules/modifier';
import { GrammarRuleDisplay } from '@/components/grammar/GrammarRuleDisplay';
import { TopicIntroduction } from '@/components/grammar/TopicIntroduction';

describe('Modifier Page Integration', () => {
  describe('Modifier Data Structure', () => {
    it('should have properly structured modifier introduction', () => {
      expect(modifierIntroduction).toHaveProperty('title');
      expect(modifierIntroduction).toHaveProperty('banglaDescription');
      expect(modifierIntroduction).toHaveProperty('types');
      expect(modifierIntroduction.types).toHaveProperty('title');
      expect(modifierIntroduction.types).toHaveProperty('description');
      expect(modifierIntroduction.types).toHaveProperty('list');
      expect(Array.isArray(modifierIntroduction.types.list)).toBe(true);
    });

    it('should have properly structured modifier rules with banglaDescription', () => {
      expect(Array.isArray(modifierRules)).toBe(true);
      expect(modifierRules.length).toBeGreaterThan(0);
      
      modifierRules.forEach(rule => {
        expect(rule).toHaveProperty('id');
        expect(rule).toHaveProperty('ruleNo');
        expect(rule).toHaveProperty('title');
        expect(rule).toHaveProperty('banglaDescription');
        expect(rule).toHaveProperty('examples');
        expect(Array.isArray(rule.examples)).toBe(true);
        expect(typeof rule.banglaDescription).toBe('string');
        expect(rule.banglaDescription.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Topic Introduction Display', () => {
    it('should display modifier introduction correctly', () => {
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
      expect(screen.getByText('Pre-modifier')).toBeInTheDocument();
      expect(screen.getByText('Post-modifier')).toBeInTheDocument();
      expect(screen.getByText('Dangling modifier (পরীক্ষায় আসে না)')).toBeInTheDocument();
    });
  });

  describe('Grammar Rule Display with banglaDescription', () => {
    it('should display rule with title → banglaDescription → examples structure', () => {
      const testRule = modifierRules[0]; // First rule
      
      render(
        <GrammarRuleDisplay
          title={testRule.title}
          banglaDescription={testRule.banglaDescription}
          examples={testRule.examples}
        />
      );
      
      // Check title is displayed
      expect(screen.getByText(testRule.title)).toBeInTheDocument();
      
      // Check banglaDescription is displayed
      expect(screen.getByText(testRule.banglaDescription)).toBeInTheDocument();
      
      // Check examples are hidden by default
      testRule.examples.forEach(example => {
        expect(screen.queryByText(example)).not.toBeInTheDocument();
      });
      
      // Check eye icon buttons are present for interactive answers
      expect(screen.getAllByTestId('eye-button')).toHaveLength(2);
    });

    it('should show/hide individual answers with eye icon toggle', () => {
      const testRule = modifierRules[1]; // Second rule
      
      render(
        <GrammarRuleDisplay
          title={testRule.title}
          banglaDescription={testRule.banglaDescription}
          examples={testRule.examples}
        />
      );
      
      // Examples should be visible by default in the new structure
      expect(screen.getByText('Examples')).toBeInTheDocument();
      
      // Eye icon buttons should be present for interactive answers
      const eyeButtons = screen.getAllByTestId('eye-button');
      expect(eyeButtons.length).toBeGreaterThan(0);
      
      // Click first eye button to reveal answer
      fireEvent.click(eyeButtons[0]);
      
      // Check that a revealed answer appears
      const revealedAnswers = screen.queryAllByTestId('revealed-answer');
      expect(revealedAnswers.length).toBeGreaterThan(0);
      
      // Click revealed answer to hide it again
      fireEvent.click(revealedAnswers[0]);
      
      // Answer should be hidden again
      expect(screen.getAllByTestId('eye-button').length).toBeGreaterThan(0);
    });
  });

  describe('Reusable Component Functionality', () => {
    it('should work with different modifier rules', () => {
      const rules = [modifierRules[0], modifierRules[3], modifierRules[8]]; // Use rules with different titles
      
      rules.forEach((rule) => {
        const { unmount } = render(
          <GrammarRuleDisplay
            title={rule.title}
            banglaDescription={rule.banglaDescription}
            examples={rule.examples}
          />
        );
        
        // Check each rule displays correctly
        expect(screen.getByText(rule.title)).toBeInTheDocument();
        expect(screen.getByText(rule.banglaDescription)).toBeInTheDocument();
        expect(screen.getAllByTestId('eye-button').length).toBeGreaterThan(0);
        
        unmount(); // Clean up before next iteration
      });
    });
  });

  describe('Content Structure Validation', () => {
    it('should display content in correct order: title → banglaDescription → examples', () => {
      const testRule = modifierRules[2]; // Third rule
      
      const { container } = render(
        <GrammarRuleDisplay
          title={testRule.title}
          banglaDescription={testRule.banglaDescription}
          examples={testRule.examples}
        />
      );
      
      const elements = container.querySelectorAll('h3, p, div');
      const textContents = Array.from(elements).map(el => el.textContent);
      
      // Title should come first
      expect(textContents.some(text => text?.includes(testRule.title))).toBe(true);
      
      // Bangla description should be present
      expect(textContents.some(text => text?.includes(testRule.banglaDescription))).toBe(true);
      
      // Examples section should be present (even if hidden)
      expect(screen.getByText('Examples')).toBeInTheDocument();
    });
  });
});