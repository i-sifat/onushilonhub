# Requirements Document

## Introduction

This feature focuses on improving the user interface and user experience of the HSC Board Questions page and related grammar learning pages. The current implementation has several UI issues including unnecessary spacing, redundant information in cards, unwanted filter options, and inconsistent styling. The goal is to create a cleaner, more focused learning experience by removing clutter, optimizing layout spacing, and standardizing the visual presentation across all HSC learning pages.

## Requirements

### Requirement 1

**User Story:** As a student using the HSC Board Questions page, I want the main content section to be prominently displayed at the top of the page, so that I can immediately see the key information about available practice materials.

#### Acceptance Criteria

1. WHEN visiting the HSC Board Questions page THEN the system SHALL display "HSC Board Questions & Practice" section at the top of the website
2. WHEN displaying the main content section THEN the system SHALL show "Practice with real board questions from previous years and mock tests"
3. WHEN showing statistics THEN the system SHALL display "9 Topics", "112 Rules", "74 Questions" prominently
4. WHEN rendering the page layout THEN the system SHALL ensure this section appears before any other content
5. WHEN displaying on mobile devices THEN the system SHALL maintain proper responsive layout for the top section

### Requirement 2

**User Story:** As a student navigating through different pages, I want a back button consistently placed in the top left corner, so that I can easily return to the previous page from any location.

#### Acceptance Criteria

1. WHEN visiting any HSC learning page THEN the system SHALL display a back button in the top left corner
2. WHEN clicking the back button THEN the system SHALL navigate to the previous page in the user's history
3. WHEN the back button is displayed THEN the system SHALL use consistent styling across all pages
4. WHEN on mobile devices THEN the system SHALL ensure the back button remains accessible and properly sized
5. WHEN the back button is not applicable THEN the system SHALL hide it appropriately

### Requirement 3

**User Story:** As a student viewing questions, rules, and combined pages, I want the content to utilize the full available screen space, so that I can see more information without unnecessary scrolling.

#### Acceptance Criteria

1. WHEN viewing question pages THEN the system SHALL remove left, right, and top spacing to use full display width
2. WHEN viewing grammar rules pages THEN the system SHALL remove left, right, and top spacing to use full display width
3. WHEN viewing combined pages THEN the system SHALL remove left, right, and top spacing to use full display width
4. WHEN displaying content THEN the system SHALL maintain proper readability while maximizing content area
5. WHEN on different screen sizes THEN the system SHALL adapt the full-width layout responsively

### Requirement 4

**User Story:** As a student browsing grammar topic cards, I want to see only essential information, so that I can quickly identify and select the topics I need to study.

#### Acceptance Criteria

1. WHEN displaying grammar topic cards THEN the system SHALL show only the topic icon, title, and question count
2. WHEN showing question count THEN the system SHALL display it in the format "45 Questions"
3. WHEN rendering topic cards THEN the system SHALL remove difficulty indicators (MEDIUM, 45m)
4. WHEN displaying cards THEN the system SHALL remove descriptive text about learning objectives
5. WHEN showing cards THEN the system SHALL remove rule count information
6. WHEN displaying cards THEN the system SHALL remove topic tags (sentence-completion, grammar-rules, conditional, +1)
7. WHEN rendering cards THEN the system SHALL remove URL information from the display

### Requirement 5

**User Story:** As a student using specific grammar topic question pages, I want a clean interface without unnecessary filter options, so that I can focus on practicing questions without distractions.

#### Acceptance Criteria

1. WHEN visiting grammar topic question pages THEN the system SHALL remove "All Types" filter option
2. WHEN displaying question filters THEN the system SHALL show only relevant filtering options for the specific topic
3. WHEN rendering the question interface THEN the system SHALL maintain clean, uncluttered appearance
4. WHEN filtering is not applicable THEN the system SHALL hide filter controls entirely
5. WHEN filters are present THEN the system SHALL ensure they are contextually relevant to the topic

### Requirement 6

**User Story:** As a student viewing HSC Grammar Rules & Concepts pages, I want to see only the grammar rules without question-related information, so that I can focus specifically on learning the rules.

#### Acceptance Criteria

1. WHEN visiting HSC Grammar Rules pages THEN the system SHALL remove the "74 Questions in HSC Grammar Rules & Concepts" card
2. WHEN displaying grammar rule cards THEN the system SHALL remove difficulty indicators (MEDIUM, 45m)
3. WHEN showing rule cards THEN the system SHALL remove descriptive learning objective text
4. WHEN displaying cards THEN the system SHALL remove question count information
5. WHEN rendering rule cards THEN the system SHALL remove topic tags (sentence-completion, grammar-rules, conditional)
6. WHEN showing grammar rules THEN the system SHALL focus content on rule information only

### Requirement 7

**User Story:** As a student viewing individual grammar rules, I want a clean presentation without complexity indicators, so that I can focus on understanding the rule content without being influenced by difficulty ratings.

#### Acceptance Criteria

1. WHEN displaying individual grammar rules THEN the system SHALL remove complexity badges (Complex, Simple, Moderate)
2. WHEN showing rule titles THEN the system SHALL present them without difficulty indicators
3. WHEN rendering rule content THEN the system SHALL focus on the educational content only
4. WHEN displaying rules THEN the system SHALL maintain consistent formatting without complexity classifications
5. WHEN students view rules THEN the system SHALL not pre-judge difficulty level for them

### Requirement 8

**User Story:** As a student using the interface controls, I want the sort/view toggle buttons to match the website's design theme, so that the interface feels cohesive and professional.

#### Acceptance Criteria

1. WHEN displaying sort buttons THEN the system SHALL use colors consistent with the website theme
2. WHEN showing list/grid toggle buttons THEN the system SHALL apply consistent styling with other interface elements
3. WHEN rendering control buttons THEN the system SHALL ensure proper contrast and accessibility
4. WHEN buttons are active/inactive THEN the system SHALL provide clear visual feedback using theme colors
5. WHEN displaying interface controls THEN the system SHALL maintain visual harmony with the overall design system