# Implementation Plan

- [x] 1. Update page layouts to use full-width display
  - Modify all HSC page components to remove container padding and margins
  - Update page.tsx files in board-questions, grammar-items, and get-started sections
  - Ensure responsive behavior is maintained across all screen sizes
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 2. Implement consistent back button positioning
  - Update BackButton component positioning to top-left corner across all pages
  - Modify page layouts to accommodate absolute positioning of back button
  - Ensure back button remains accessible and properly sized on mobile devices
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 3. Enhance UniversalTopicNavigation header section prominence
  - Move main content section (title, description, statistics) to top of page
  - Ensure "HSC Board Questions & Practice" section appears before other content
  - Update statistics display to show "9 Topics", "112 Rules", "74 Questions" prominently
  - Maintain responsive layout for mobile devices
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 4. Simplify topic cards in UniversalTopicNavigation
  - Remove difficulty indicators (MEDIUM, 45m) from topic cards
  - Remove descriptive text about learning objectives
  - Remove rule count information from cards
  - Remove topic tags (sentence-completion, grammar-rules, conditional, +1)
  - Remove URL information from card display
  - Keep only topic icon, title, and question count in format "45 Questions"
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 5. Remove contextual filters from topic-specific question pages
  - Update UniversalQuestionsUI to conditionally hide "All Types" filter
  - Create filter configuration system for topic-specific pages
  - Remove question type filter for transformation, connectors, modifier, narration, completing-sentence, and use-of-verbs pages
  - Maintain other relevant filters (search, board, year, difficulty)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 6. Remove questions card from HSC Grammar Rules pages
  - Update UniversalTopicNavigation to hide questions-related cards in grammar-items section
  - Remove "74 Questions in HSC Grammar Rules & Concepts" card display
  - Ensure grammar pages focus only on grammar rules content
  - Maintain consistent layout without questions information
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 7. Simplify grammar rule cards display
  - Remove difficulty indicators (MEDIUM, 45m) from grammar rule cards
  - Remove descriptive learning objective text from rule cards
  - Remove question count information from grammar rule cards
  - Remove topic tags (sentence-completion, grammar-rules, conditional) from rule cards
  - Focus content on rule information only
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 8. Remove complexity badges from individual grammar rules
  - Update UniversalGrammarUI to remove complexity badges (Complex, Simple, Moderate)
  - Modify rule title display to present without difficulty indicators
  - Focus rule content on educational material without complexity classifications
  - Maintain consistent formatting across all rule displays
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 9. Update interface control styling for theme consistency
  - Modify sort/view toggle buttons (list/grid) to use website theme colors
  - Update button colors to match sf-button (#febc38) and related theme colors
  - Ensure proper contrast and accessibility for active/inactive states
  - Apply consistent styling with other interface elements
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 10. Test and validate all UI improvements
  - Verify full-width layout works correctly across all screen sizes including Grammar Rules page such as (
Completing Sentence,Connectors,Modifier,Narration,Transformation,Use of Verbs,Preposition,Punctuation,Synonym & Antonym)
  - Test back button positioning and functionality on all pages
  - Validate simplified cards display correctly without removed elements
  - Ensure filter systems work properly with contextual configurations
  - Test theme-consistent button styling and interactions
  - ensure This Grammar rules and Concepts card is small. this is so big. HSC Grammar Rules & Concepts, Explore comprehensive grammar rules, structures, and examples for each topic, 9 Topics,112 Rules
  - ensure the learning section is removed from whole website.
  Learning Sections
Get Started
Grammar Items
Board Questions
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1_