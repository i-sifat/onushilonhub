# Design Document

## Overview

The Combined Section with Rule-Question Linking feature creates an intelligent learning interface that displays grammar rules on the left side and related questions on the right side. The system analyzes question hints and rule titles to automatically create associations, providing students with a comprehensive study experience that combines theoretical knowledge with practical application.

## Architecture

### Component Hierarchy
```
CombinedSectionPage
├── CombinedSectionLayout
│   ├── RulesPanel (Left Side - 30% width)
│   │   ├── RulesList
│   │   │   └── RuleItem (with question count badge)
│   └── QuestionsPanel (Right Side - 70% width)
│       ├── SelectedRuleDetails
│       │   ├── RuleTitle
│       │   ├── BanglaDescription
│       │   └── InteractiveAnswerReveal (for examples)
│       └── RelatedQuestionsList
│           └── QuestionCard (with InteractiveAnswerReveal)
```

### Data Flow
1. **Load Data**: Import rules from `data/grammar-rules/modifier.ts` and questions from `data/questions/modifier.ts`
2. **Analyze Relationships**: Process question hints to identify rule associations
3. **Create Mappings**: Build rule-to-questions mapping with question counts
4. **Render Interface**: Display rules list with badges and handle rule selection
5. **Show Related Content**: Display selected rule details and associated questions

## Components and Interfaces

### Core Components

#### CombinedSectionLayout
```typescript
interface CombinedSectionLayoutProps {
  topic: string;
  level: 'HSC' | 'SSC';
  rules: ModifierRule[];
  questions: ModifierQuestion[];
  selectedRuleId?: number;
  onRuleSelect: (ruleId: number) => void;
}
```

**Responsibilities:**
- Manage overall layout with responsive two-panel design
- Handle rule selection state
- Coordinate data flow between panels

#### RulesPanel
```typescript
interface RulesPanelProps {
  rules: ModifierRule[];
  questionCounts: Record<number, number>;
  selectedRuleId?: number;
  onRuleSelect: (ruleId: number) => void;
}
```

**Responsibilities:**
- Display list of grammar rules
- Show question count badges for each rule
- Handle rule selection interactions
- Highlight selected rule

#### QuestionsPanel
```typescript
interface QuestionsPanelProps {
  selectedRule?: ModifierRule;
  relatedQuestions: ModifierQuestion[];
  isLoading?: boolean;
}
```

**Responsibilities:**
- Display selected rule details using existing components
- Show list of related questions with interactive answers
- Handle loading states when switching rules

### Rule-Question Linking System

#### RuleQuestionMatcher
```typescript
interface RuleQuestionMatcher {
  analyzeQuestions(questions: ModifierQuestion[]): QuestionAnalysis[];
  matchRulesWithQuestions(rules: ModifierRule[], analyses: QuestionAnalysis[]): RuleQuestionMapping;
  getQuestionsForRule(ruleId: number, mapping: RuleQuestionMapping): ModifierQuestion[];
}

interface QuestionAnalysis {
  questionId: string;
  hints: string[];
  extractedKeywords: string[];
  suggestedRuleIds: number[];
}

interface RuleQuestionMapping {
  [ruleId: number]: string[]; // Array of question IDs
}
```

**Matching Logic:**
1. **Extract Hints**: Parse question text to find hints in parentheses like "(use possessive to pre-modify the noun)"
2. **Keyword Analysis**: Extract key terms like "pre-modify", "post-modify", "adjective", "noun", etc.
3. **Fuzzy Matching**: Match extracted keywords with rule titles using similarity algorithms
4. **Manual Mappings**: Handle edge cases with predefined rule-question associations

#### Matching Rules Examples:
- Hint: "(use possessive to pre-modify the noun)" → Rule 5: "Use Possessive to pre-modify the noun"
- Hint: "(pre-modify the adjective with an intensifier)" → Rule 3: "Use Intensifier to pre-modify the adjective"
- Hint: "(use an infinitive to post-modify the verb)" → Rule 13: "Use infinitive to post-modify the verb"

## Data Models

### Enhanced Question Interface
```typescript
interface ProcessedModifierQuestion extends ModifierQuestion {
  extractedHints: string[];
  linkedRuleIds: number[];
  confidence: number; // 0-1 score for rule matching confidence
}
```

### Rule Display Data
```typescript
interface RuleDisplayData {
  rule: ModifierRule;
  questionCount: number;
  relatedQuestions: ProcessedModifierQuestion[];
  isSelected: boolean;
}
```

## Error Handling

### Graceful Degradation
- **No Rule Selected**: Show default message prompting user to select a rule
- **No Questions Found**: Display "No practice questions available for this rule"
- **Loading States**: Show skeleton loaders while processing rule-question relationships
- **Matching Failures**: Log unmatched questions for manual review

### Error Boundaries
- Wrap components in error boundaries to prevent crashes
- Provide fallback UI for component failures
- Log errors for debugging and improvement

## Testing Strategy

### Unit Tests
- **RuleQuestionMatcher**: Test matching algorithms with various hint formats
- **Component Rendering**: Test individual components with mock data
- **State Management**: Test rule selection and data flow

### Integration Tests
- **End-to-End Flow**: Test complete user journey from rule selection to question viewing
- **Data Processing**: Test with real modifier data to ensure accurate matching
- **Responsive Behavior**: Test layout on different screen sizes

### Performance Tests
- **Large Dataset Handling**: Test with full question dataset
- **Matching Algorithm Speed**: Ensure sub-second matching performance
- **Memory Usage**: Monitor component memory consumption

## Responsive Design

### Desktop (≥1024px)
- Two-panel layout: Rules (30%) | Questions (70%)
- Fixed sidebar with scrollable content areas
- Hover effects and smooth transitions

### Tablet (768px - 1023px)
- Adjusted proportions: Rules (35%) | Questions (65%)
- Collapsible rules panel option
- Touch-friendly interaction targets

### Mobile (≤767px)
- Stacked layout or drawer-based navigation
- Full-width question display
- Swipe gestures for rule navigation

## Performance Optimizations

### Lazy Loading
- Load questions only when rule is selected
- Implement virtual scrolling for large question lists
- Lazy load InteractiveAnswerReveal components

### Memoization
- Cache rule-question matching results
- Memoize expensive filtering operations
- Use React.memo for stable components

### Code Splitting
- Split combined section code into separate bundle
- Load matching algorithms asynchronously
- Implement progressive loading for better perceived performance

## Accessibility

### Keyboard Navigation
- Tab through rules list and questions
- Enter/Space to select rules
- Arrow keys for list navigation

### Screen Reader Support
- Proper ARIA labels for rule selection
- Announce question counts and rule changes
- Semantic HTML structure

### Visual Accessibility
- High contrast mode support
- Scalable text and UI elements
- Clear focus indicators

## Future Extensibility

### Multi-Topic Support
```typescript
interface TopicCombinedSection {
  topic: string;
  rules: GrammarRule[];
  questions: Question[];
  matcher: RuleQuestionMatcher;
}
```

### Advanced Matching
- Machine learning-based rule-question association
- User feedback integration for improving matches
- Confidence scoring and manual override options

### Enhanced Features
- Bookmarking favorite rule-question combinations
- Progress tracking for completed questions
- Difficulty-based question filtering