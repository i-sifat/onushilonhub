# Design Document

## Overview

This design outlines the user interface improvements for the HSC Board Questions page and related grammar learning pages. The current implementation uses a universal component system with UniversalTopicNavigation, UniversalQuestionsUI, and UniversalGrammarUI components. The improvements focus on layout optimization, content simplification, and visual consistency while maintaining the existing component architecture.

### Current State Analysis

The application currently uses:
- Next.js 15.4.1 with App Router structure
- Universal component system for consistent UI across topics
- Custom design system with sf-* color variables
- Responsive layout with max-width containers and padding
- Complex topic cards with multiple information elements
- Filter systems with comprehensive options

### Target Improvements

The redesigned interface will prioritize content visibility, reduce visual clutter, and create a more focused learning experience by removing unnecessary elements and optimizing spacing.

## Architecture

### Component Hierarchy

```
HSC Pages
├── BackButton (top-left positioning)
├── UniversalTopicNavigation (main content section)
│   ├── Header Section (prominently displayed)
│   ├── Statistics Cards (simplified)
│   └── Topic Cards (streamlined)
├── UniversalQuestionsUI (full-width layout)
│   ├── Filter Bar (contextual filters only)
│   └── Questions List (clean presentation)
└── UniversalGrammarUI (full-width layout)
    ├── Rules Display (complexity badges removed)
    └── Search Interface (simplified)
```

### Layout Strategy

1. **Full-Width Content**: Remove container padding and margins to utilize full screen width
2. **Top-Left Navigation**: Consistent back button placement across all pages
3. **Prominent Header**: Main content section displayed at the top of each page
4. **Simplified Cards**: Remove redundant information and focus on essential elements

## Components and Interfaces

### 1. Layout Modifications

#### Page Container Updates
```typescript
// Current layout with padding
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

// New full-width layout
<div className="w-full px-0 py-0">
```

#### Back Button Positioning
```typescript
interface BackButtonProps {
  position: 'top-left';
  className?: string;
}

// Consistent positioning across all pages
<div className="absolute top-4 left-4 z-10">
  <BackButton />
</div>
```

### 2. UniversalTopicNavigation Enhancements

#### Header Section Prominence
```typescript
interface HeaderSectionProps {
  title: string;
  description: string;
  statistics: {
    topics: number;
    rules: number;
    questions: number;
  };
  position: 'top'; // Always at top of page
}
```

#### Simplified Topic Cards
```typescript
interface SimplifiedTopicCardProps {
  icon: string;
  title: string;
  questionCount: number;
  // Removed properties:
  // - difficulty: string;
  // - estimatedTime: number;
  // - description: string;
  // - ruleCount: number;
  // - tags: string[];
  // - url: string;
}
```

### 3. UniversalQuestionsUI Modifications

#### Contextual Filter System
```typescript
interface ContextualFiltersProps {
  topic: string;
  availableFilters: {
    search: boolean;
    board: boolean;
    year: boolean;
    difficulty: boolean;
    // Removed: questionType filter for specific topics
  };
}

// Remove "All Types" filter for topic-specific pages
const getAvailableFilters = (topicSlug: string) => {
  const topicSpecificPages = [
    'transformation', 'narration', 'modifier', 
    'connectors', 'completing-sentence', 'use-of-verbs'
  ];
  
  return {
    search: true,
    board: true,
    year: true,
    difficulty: true,
    questionType: !topicSpecificPages.includes(topicSlug)
  };
};
```

### 4. UniversalGrammarUI Enhancements

#### Simplified Grammar Rules Display
```typescript
interface SimplifiedGrammarRuleProps {
  id: number;
  title: string;
  content: string;
  examples: string[];
  // Removed properties:
  // - complexity: 'Simple' | 'Moderate' | 'Complex';
  // - difficulty: string;
  // - estimatedTime: number;
  // - description: string;
  // - questionCount: number;
  // - tags: string[];
}
```

#### Remove Questions Card from Grammar Pages
```typescript
// Remove this component from HSC Grammar Rules pages
interface QuestionsCardProps {
  // This entire component should be removed
  questionCount: number;
  title: string;
}
```

## Data Models

### Simplified Topic Configuration

```typescript
interface SimplifiedTopicConfig {
  id: string;
  name: string;
  slug: string;
  icon: string;
  questionCount: number;
  color: string;
  routes: {
    practice: string;
    questions: string;
    grammarRules: string;
  };
  // Removed fields:
  // difficulty: string;
  // estimatedTime: number;
  // description: string;
  // ruleCount: number;
  // tags: string[];
  // prerequisites: string[];
}
```

### Filter Configuration

```typescript
interface FilterConfiguration {
  [topicSlug: string]: {
    showQuestionTypeFilter: boolean;
    availableBoards: string[];
    availableYears: string[];
    availableDifficulties: string[];
  };
}

const filterConfig: FilterConfiguration = {
  'transformation': {
    showQuestionTypeFilter: false, // Remove "All Types"
    availableBoards: BOARDS,
    availableYears: YEARS,
    availableDifficulties: DIFFICULTIES
  },
  'connectors': {
    showQuestionTypeFilter: false,
    availableBoards: BOARDS,
    availableYears: YEARS,
    availableDifficulties: DIFFICULTIES
  },
  // ... other topic-specific configurations
};
```

## Error Handling

### Layout Error Boundaries

```typescript
interface LayoutErrorBoundaryProps {
  fallback: React.ComponentType<{error: Error}>;
  children: React.ReactNode;
}

// Wrap full-width layouts with error boundaries
<LayoutErrorBoundary fallback={FullWidthErrorFallback}>
  <FullWidthContent />
</LayoutErrorBoundary>
```

### Responsive Layout Handling

```typescript
interface ResponsiveLayoutProps {
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  fullWidth: boolean;
}

// Ensure full-width layouts work across all screen sizes
const useResponsiveLayout = (fullWidth: boolean) => {
  return {
    containerClass: fullWidth 
      ? 'w-full px-0' 
      : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    contentClass: fullWidth 
      ? 'min-h-screen' 
      : 'min-h-screen py-12'
  };
};
```

## Testing Strategy

### Visual Regression Testing

```typescript
interface VisualTestSuite {
  components: string[];
  viewports: string[];
  scenarios: string[];
}

const visualTests: VisualTestSuite = {
  components: [
    'UniversalTopicNavigation',
    'UniversalQuestionsUI', 
    'UniversalGrammarUI',
    'BackButton'
  ],
  viewports: ['mobile', 'tablet', 'desktop'],
  scenarios: [
    'default-state',
    'with-filters',
    'full-width-layout',
    'simplified-cards'
  ]
};
```

### Accessibility Testing

```typescript
interface AccessibilityTestConfig {
  focusManagement: boolean;
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  colorContrast: boolean;
}

// Ensure full-width layouts maintain accessibility
const a11yTests: AccessibilityTestConfig = {
  focusManagement: true, // Back button focus handling
  keyboardNavigation: true, // Full-width content navigation
  screenReaderSupport: true, // Simplified card content
  colorContrast: true // Theme-consistent button colors
};
```

## Performance Optimization

### Layout Optimization

```typescript
interface LayoutOptimization {
  removeUnusedPadding: boolean;
  optimizeCardRendering: boolean;
  simplifyFilterLogic: boolean;
  reduceReflows: boolean;
}

// Performance improvements from layout changes
const optimizations: LayoutOptimization = {
  removeUnusedPadding: true, // Reduce CSS calculations
  optimizeCardRendering: true, // Fewer elements per card
  simplifyFilterLogic: true, // Remove unused filter options
  reduceReflows: true // Full-width prevents container recalculations
};
```

### Bundle Size Reduction

```typescript
// Remove unused components and props
interface BundleOptimization {
  removedComponents: string[];
  simplifiedProps: string[];
  reducedComplexity: number;
}

const bundleImprovements: BundleOptimization = {
  removedComponents: [
    'ComplexityBadge',
    'QuestionCountCard',
    'DescriptionText',
    'TagsList'
  ],
  simplifiedProps: [
    'TopicCardProps',
    'FilterProps',
    'GrammarRuleProps'
  ],
  reducedComplexity: 30 // Estimated percentage reduction
};
```

## Implementation Strategy

### Phase 1: Layout Structure Updates
1. Modify page containers to use full-width layout
2. Update back button positioning to top-left
3. Ensure responsive behavior across screen sizes

### Phase 2: Component Simplification
1. Remove unnecessary elements from topic cards
2. Simplify filter options for topic-specific pages
3. Remove complexity badges from grammar rules

### Phase 3: Header Section Enhancement
1. Move main content section to top of pages
2. Ensure statistics are prominently displayed
3. Maintain responsive design for mobile devices

### Phase 4: Theme Consistency
1. Update button colors to match website theme
2. Ensure consistent styling across all components
3. Maintain accessibility standards

## Design System Integration

### Color Consistency

```typescript
interface ThemeConsistentColors {
  buttons: {
    primary: string; // sf-button (#febc38)
    secondary: string; // sf-highlight
    outline: string; // sf-button with transparent background
  };
  backgrounds: {
    main: string; // sf-bg (#212121)
    card: string; // neutral-800
    elevated: string; // neutral-700
  };
  text: {
    primary: string; // sf-text-bold (#cfcfcf)
    secondary: string; // sf-text-subtle (#e8e8e8)
    muted: string; // sf-text-muted (#b8b8b8)
  };
}
```

### Component Styling Updates

```typescript
// Update sort/view toggle buttons to use theme colors
const themeConsistentButton = {
  base: 'border border-sf-text-muted/20 text-sf-text-subtle',
  active: 'bg-sf-button text-sf-bg border-sf-button',
  hover: 'hover:bg-sf-button/10 hover:border-sf-button/50',
  focus: 'focus:ring-2 focus:ring-sf-button focus:ring-offset-2 focus:ring-offset-sf-bg'
};
```

This design provides a comprehensive foundation for implementing the UI improvements while maintaining the existing component architecture and ensuring consistency across the educational platform.