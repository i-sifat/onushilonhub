# Requirements Document

## Introduction

This feature implements an intelligent combined section for grammar topics that displays grammar rules on the left side and related questions on the right side. The system will analyze question hints and rule titles to automatically link questions with their corresponding grammar rules. When users click on a rule, they will see the rule details at the top right and all related questions below it. The feature starts with the modifier topic and will be extended to other grammar topics in the future.

## Requirements

### Requirement 1

**User Story:** As a student using the combined section, I want to see grammar rules listed on the left side with question count badges, so that I can understand how many practice questions are available for each rule.

#### Acceptance Criteria

1. WHEN visiting the combined section for modifier topic THEN the system SHALL display all grammar rules from data/grammar-rules/modifier.ts on the left side
2. WHEN showing each rule THEN the system SHALL display a circular badge with the count of related questions
3. WHEN calculating question counts THEN the system SHALL analyze question hints to match them with rule titles
4. WHEN displaying rule titles THEN the system SHALL show them in a clickable list format
5. WHEN rules have no related questions THEN the system SHALL show a badge with "0"

### Requirement 2

**User Story:** As a student browsing grammar rules, I want to click on any rule to see its details and related questions on the right side, so that I can study the rule and practice with relevant questions.

#### Acceptance Criteria

1. WHEN clicking on a rule in the left panel THEN the system SHALL display the rule details in the top right section
2. WHEN showing rule details THEN the system SHALL use the same formatting as the grammar rules section (title, Bengali description, interactive examples)
3. WHEN displaying rule details THEN the system SHALL include the InteractiveAnswerReveal component for examples with eye icons
4. WHEN showing related questions THEN the system SHALL display them in cards below the rule details
5. WHEN no rule is selected THEN the system SHALL show a default message prompting user to select a rule

### Requirement 3

**User Story:** As a student practicing with questions, I want the questions to show with hidden answers using eye icons, so that I can test my knowledge before revealing the correct answers.

#### Acceptance Criteria

1. WHEN displaying questions in the combined section THEN the system SHALL use the InteractiveAnswerReveal component
2. WHEN questions have bracketed answers THEN the system SHALL replace them with eye icons initially
3. WHEN tapping an eye icon THEN the system SHALL reveal the specific answer for that blank
4. WHEN tapping a revealed answer THEN the system SHALL hide it again and show the eye icon
5. WHEN formatting questions THEN the system SHALL maintain the same style as the questions section

### Requirement 4

**User Story:** As a student using the combined section, I want the system to intelligently match questions with grammar rules based on their content and hints, so that I see relevant practice questions for each rule.

#### Acceptance Criteria

1. WHEN analyzing questions THEN the system SHALL examine question hints in parentheses to identify rule relationships
2. WHEN matching rules and questions THEN the system SHALL use fuzzy matching to handle slight variations in naming
3. WHEN a question hint mentions "pre-modify" THEN the system SHALL link it to pre-modifier rules
4. WHEN a question hint mentions "post-modify" THEN the system SHALL link it to post-modifier rules
5. WHEN question hints contain rule-specific keywords THEN the system SHALL create appropriate rule-question associations

### Requirement 5

**User Story:** As a student navigating the combined section, I want a responsive two-panel layout that works well on different screen sizes, so that I can use the feature effectively on various devices.

#### Acceptance Criteria

1. WHEN viewing on desktop THEN the system SHALL display rules on the left (30% width) and questions on the right (70% width)
2. WHEN viewing on tablet THEN the system SHALL maintain the two-panel layout with adjusted proportions
3. WHEN viewing on mobile THEN the system SHALL stack panels vertically or use a collapsible sidebar approach
4. WHEN switching between rules THEN the system SHALL maintain smooth transitions and responsive behavior
5. WHEN displaying content THEN the system SHALL ensure both panels are scrollable independently

### Requirement 6

**User Story:** As a student using the combined section, I want the interface to maintain consistency with existing grammar and question sections, so that the learning experience feels unified across the platform.

#### Acceptance Criteria

1. WHEN displaying rule details THEN the system SHALL use the same components and styling as the grammar rules section
2. WHEN showing questions THEN the system SHALL use the same card design and formatting as the questions section
3. WHEN implementing interactions THEN the system SHALL maintain the same hover effects and animations
4. WHEN displaying content THEN the system SHALL follow the established design system and color scheme
5. WHEN users navigate THEN the system SHALL provide familiar interaction patterns from other sections

### Requirement 7

**User Story:** As a student studying different grammar topics, I want the combined section system to be extensible to other topics beyond modifier, so that I can use the same learning approach across all grammar areas.

#### Acceptance Criteria

1. WHEN implementing the combined section THEN the system SHALL create reusable components that work with any topic
2. WHEN adding new topics THEN the system SHALL use the same rule-question linking logic
3. WHEN extending to other topics THEN the system SHALL maintain the same layout and interaction patterns
4. WHEN processing different topic data THEN the system SHALL handle various rule and question structures
5. WHEN scaling the feature THEN the system SHALL ensure performance remains optimal across multiple topics

### Requirement 8

**User Story:** As a student using the combined section, I want clear visual feedback when selecting rules and viewing questions, so that I understand which rule I'm currently studying and how the questions relate to it.

#### Acceptance Criteria

1. WHEN selecting a rule THEN the system SHALL highlight the selected rule in the left panel
2. WHEN displaying related questions THEN the system SHALL show a clear heading indicating which rule the questions relate to
3. WHEN no questions are found for a rule THEN the system SHALL display an appropriate message
4. WHEN switching between rules THEN the system SHALL provide smooth visual transitions
5. WHEN loading question content THEN the system SHALL show appropriate loading states