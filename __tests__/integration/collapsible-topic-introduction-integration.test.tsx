import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { modifierRules, modifierIntroduction } from '@/data/grammar-rules/modifier';

describe('CollapsibleTopicIntroduction Integration', () => {
  it('integrates correctly with UniversalGrammarUI', () => {
    render(
      <UniversalGrammarUI
        topic="Modifier"
        topicSlug="modifier"
        rules={modifierRules}
        level="HSC"
        showSearch={true}
        showFilters={true}
        topicIntroduction={modifierIntroduction}
      />
    );
    
    // Check if the collapsible introduction is rendered
    expect(screen.getByText('What is Modifier?')).toBeInTheDocument();
    
    // Check if it's collapsed by default
    expect(screen.queryByText(modifierIntroduction.banglaDescription)).not.toBeInTheDocument();
    
    // Click to expand - find the collapsible button specifically
    const collapsibleHeader = screen.getByText('What is Modifier?').closest('div')?.parentElement;
    if (collapsibleHeader) {
      fireEvent.click(collapsibleHeader);
    }
    
    // Check if content is now visible
    expect(screen.getByText(modifierIntroduction.banglaDescription)).toBeVisible();
    expect(screen.getByText('Pre-modifier')).toBeVisible();
    expect(screen.getByText('Post-modifier')).toBeVisible();
    
    // Check if the grammar rules are also rendered
    expect(screen.getByText('Modifier Grammar Rules')).toBeInTheDocument();
  });

  it('works with modifier data structure', () => {
    render(
      <UniversalGrammarUI
        topic="Modifier"
        topicSlug="modifier"
        rules={modifierRules}
        level="HSC"
        topicIntroduction={modifierIntroduction}
      />
    );
    
    // Verify the modifier-specific content
    expect(screen.getByText('What is Modifier?')).toBeInTheDocument();
    
    // Expand and check modifier types - find the collapsible button specifically
    const collapsibleHeader = screen.getByText('What is Modifier?').closest('div')?.parentElement;
    if (collapsibleHeader) {
      fireEvent.click(collapsibleHeader);
    }
    
    expect(screen.getByText('Modifier কত প্রকার?')).toBeVisible();
    expect(screen.getByText('Modifier মূলত ৩ প্রকারের হয়, তবে পরীক্ষায় ২ প্রকার আসে:')).toBeVisible();
    expect(screen.getByText('Dangling modifier (পরীক্ষায় আসে না)')).toBeVisible();
  });
});