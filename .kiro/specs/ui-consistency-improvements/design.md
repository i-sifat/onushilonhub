# Design Document

## Overview

This design outlines comprehensive UI consistency improvements for the HSC learning platform, focusing on creating reusable components, fixing homepage layout issues, implementing interactive learning features, and optimizing performance. The current implementation has inconsistent page layouts across sections, a homepage animated card that changes size inappropriately, duplicate navigation links, and lacks interactive answer reveal functionality that would enhance the learning experience.

### Current State Analysis

The application currently uses:
- Next.js 15.4.1 with App Router structure
- Universal component system (UniversalTopicNavigation, UniversalQuestionsUI, UniversalGrammarUI)
- StudentFriendlyHomepage with dynamic text and animated card
- Individual grammar rule data with examples
- Multiple navigation links on homepage
- Static answer display without interactivity

### Target Improvements

The redesigned interface will deliver:
1. **Unified Component System**: Reusable components across grammar/question/combined sections
2. **Fixed Homepage Layout**: Constant animated card size regardless of dynamic text
3. **Simplified Navigation**: Single, clear navigation paths without duplication
4. **Interactive Learning**: Collapsible information cards and eye icon answer reveals
5. **Performance Optimization**: Lightweight, fast-loading application without database dependencies

## Architecture

### Component Hierarchy

```
Unified Page Structure
├── UnifiedPageLayout (shared across all sections)
│   ├── BackButton (consistent positioning)
│   ├── HeaderSection (standardized)
│   └── ContentArea (flexible based on section type)
├── InteractiveAnswerSystem
│   ├── EyeIconReveal (for individual answers)
│   └── CollapsibleCard (for topic introductions)
└── OptimizedHomepage
    ├── FixedAnimatedCard (constant dimensions)
    └── SimplifiedNavigation (single links)
```

### Layout Strategy

1. **Unified Components**: Single reusable components for HSC/SSC selection and topic cards
2. **Fixed Dimensions**: Homepage animated card maintains constant size
3. **Interactive Elements**: Eye icons for answer reveals and collapsible information cards
4. **Performance Focus**: Remove database dependencies and optimize bundle size

## Components and Interfaces

### 1. Unified Page Layout System

#### UnifiedPageLayout Component
```typescript
interface UnifiedPageLayoutProps {
  pageType: 'grammar' | 'questions' | 'combined';
  level: 'HSC' | 'SSC';
  title: string;
  description: string;
  statistics: {
    topics: number;
    rules?: number;
    questions?: number;
  };
  children: React.ReactNode;
  showBackButton?: boolean;
}

const UnifiedPageLayout: React.FC<UnifiedPageLayoutProps> = ({
  pageType, level, title, description, statistics, children, showBackButton = true
}) => {
  return (
    <div className="min-h-screen bg-sf-bg">
      {showBackButton && (
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>
      )}
      
      <div className="space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Standardized Header */}
        <UnifiedHeaderSection
          level={level}
          title={title}
          description={description}
          statistics={statistics}
          pageType={pageType}
        />
        
        {/* Content Area */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
```

#### UnifiedHeaderSection Component
```typescript
interface UnifiedHeaderSectionProps {
  level: 'HSC' | 'SSC';
  title: string;
  description: string;
  statistics: {
    topics: number;
    rules?: number;
    questions?: number;
  };
  pageType: 'grammar' | 'questions' | 'combined';
}

const UnifiedHeaderSection: React.FC<UnifiedHeaderSectionProps> = ({
  level, title, description, statistics, pageType
}) => {
  const getStatCards = () => {
    const cards = [
      { icon: BookOpen, value: statistics.topics, label: 'Topics' }
    ];
    
    if (pageType !== 'grammar' && statistics.rules) {
      cards.push({ icon: Target, value: statistics.rules, label: 'Rules' });
    }
    
    if (pageType !== 'grammar' && statistics.questions) {
      cards.push({ icon: Users, value: statistics.questions, label: 'Questions' });
    }
    
    return cards;
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-sf-bg via-sf-bg/98 to-sf-bg/95 p-6 rounded-xl border border-sf-text-muted/10 shadow-lg">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-sf-text-bold">
          {level} {title}
        </h1>
        <p className="text-sf-text-subtle text-lg max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {getStatCards().map((stat, index) => (
          <Card key={index} className="p-4 text-center bg-gradient-to-br from-sf-button/10 to-sf-button/5 border-sf-button/30">
            <div className="space-y-2">
              <stat.icon className="h-6 w-6 text-sf-button mx-auto" />
              <div className="text-2xl font-bold text-sf-text-bold">{stat.value}</div>
              <div className="text-sm text-sf-text-muted font-semibold">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

### 2. Reusable Selection and Topic Cards

#### UnifiedSelectionCard Component
```typescript
interface UnifiedSelectionCardProps {
  type: 'HSC' | 'SSC';
  section: 'grammar' | 'questions' | 'combined';
  title: string;
  description: string;
  statistics: {
    topics?: number;
    rules?: number;
    questions?: number;
  };
  route: string;
  className?: string;
}

const UnifiedSelectionCard: React.FC<UnifiedSelectionCardProps> = ({
  type, section, title, description, statistics, route, className
}) => {
  return (
    <Link href={route}>
      <Card className={cn(
        "group relative overflow-hidden rounded-xl border border-sf-text-muted/20",
        "bg-neutral-800 p-6 transition-all duration-300 ease-out",
        "hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10",
        "hover:-translate-y-1 hover:scale-[1.02]",
        "cursor-pointer",
        className
      )}>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sf-button border-sf-button/30">
                {type}
              </Badge>
              <div className="text-sf-text-muted text-sm capitalize">
                {section}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-sf-text-bold group-hover:text-sf-button transition-colors">
                {title}
              </h3>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {description}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-sf-text-muted">
              {statistics.topics && (
                <span>{statistics.topics} Topics</span>
              )}
              {statistics.rules && (
                <span>{statistics.rules} Rules</span>
              )}
              {statistics.questions && (
                <span>{statistics.questions} Questions</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
```

#### StandardizedTopicCard Component (Enhanced)
```typescript
interface StandardizedTopicCardProps {
  topic: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    color: string;
  };
  section: 'grammar' | 'questions' | 'combined';
  questionCount: number;
  size: 'standard';
  showHoverEffects: boolean;
}

const StandardizedTopicCard: React.FC<StandardizedTopicCardProps> = ({
  topic, section, questionCount, size = 'standard', showHoverEffects = true
}) => {
  const getRoute = () => {
    const baseRoutes = {
      grammar: `/grammar-items/hsc/${topic.slug}`,
      questions: `/board-questions/hsc/${topic.slug}`,
      combined: `/get-started/hsc/${topic.slug}`
    };
    return baseRoutes[section];
  };

  return (
    <Link href={getRoute()}>
      <Card className={cn(
        "w-full aspect-square rounded-xl border border-sf-text-muted/20",
        "bg-neutral-800 p-4 transition-all duration-300 ease-out",
        "cursor-pointer",
        showHoverEffects && [
          "hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10",
          "hover:-translate-y-1 hover:scale-[1.02]"
        ]
      )}>
        <CardContent className="p-0 h-full flex flex-col justify-between">
          <div className="text-center space-y-3">
            <div className="text-4xl">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-sf-text-bold leading-tight">
              {topic.name}
            </h3>
          </div>
          
          <div className="text-center">
            <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
              {questionCount} Questions
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
```

### 3. Fixed Homepage Layout

#### OptimizedHomepage Component
```typescript
interface OptimizedHomepageProps {
  dynamicTexts: string[];
  features: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
}

const OptimizedHomepage: React.FC<OptimizedHomepageProps> = ({
  dynamicTexts, features
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sf-bg via-sf-bg to-neutral-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sf-button/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sf-highlight/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Dynamic Content */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-sf-text-bold">
                Learn Grammar the{' '}
                <span className="bg-gradient-to-r from-sf-button via-sf-highlight to-sf-button bg-clip-text text-transparent animate-pulse">
                  Smart Way
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-sf-text-subtle leading-relaxed">
                Free, comprehensive HSC & SSC grammar resources designed by students, for students.
              </p>
            </div>

            {/* Dynamic rotating text */}
            <div className="bg-sf-button/10 border border-sf-button/20 rounded-2xl p-6 backdrop-blur-sm">
              <DynamicTextRotator 
                texts={dynamicTexts}
                className="text-lg font-semibold text-sf-button"
                speed={3500}
              />
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-neutral-800/50 border border-sf-text-muted/20 rounded-xl p-4 hover:border-sf-button/30 hover:bg-neutral-800/70 transition-all duration-300 hover:scale-105"
                >
                  <feature.icon className="w-8 h-8 text-sf-button mb-2" />
                  <h3 className="font-semibold text-sf-text-bold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-sf-text-subtle">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Simplified CTA Buttons - Single link per destination */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/get-started" 
                className="group inline-flex items-center justify-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/25 hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/board-questions" 
                className="group inline-flex items-center justify-center bg-transparent border-2 border-sf-button text-sf-button hover:bg-sf-button hover:text-sf-bg px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Practice Questions
              </Link>
            </div>
          </div>

          {/* Right: Fixed Animated Card */}
          <div className="flex justify-center items-center lg:justify-end">
            <div className="relative">
              {/* Fixed dimensions container */}
              <div className="w-96 h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-sf-button/20 rounded-3xl blur-2xl scale-110 animate-pulse"></div>
                <div className="relative w-full h-full">
                  <EnhancedHeroStatsCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 4. Interactive Learning Components

#### CollapsibleTopicIntroduction Component
```typescript
interface CollapsibleTopicIntroductionProps {
  title: string;
  banglaDescription: string;
  types?: {
    title: string;
    description: string;
    list: string[];
  };
  defaultExpanded?: boolean;
}

const CollapsibleTopicIntroduction: React.FC<CollapsibleTopicIntroductionProps> = ({
  title, banglaDescription, types, defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="border-sf-text-muted/20 overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-sf-button/5 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📚</div>
            <h2 className="text-lg font-semibold text-sf-text-bold">
              {title}
            </h2>
          </div>
          <Button variant="ghost" size="sm">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-sf-button" />
            ) : (
              <ChevronDown className="h-4 w-4 text-sf-button" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-sf-text-muted/10">
          <div className="pt-4">
            <p className="text-sf-text-subtle leading-relaxed">
              {banglaDescription}
            </p>
          </div>

          {types && (
            <div className="space-y-3">
              <h3 className="text-md font-semibold text-sf-text-bold">
                {types.title}
              </h3>
              <p className="text-sf-text-subtle text-sm">
                {types.description}
              </p>
              <ul className="space-y-2">
                {types.list.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sf-button rounded-full"></div>
                    <span className="text-sf-text-subtle">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
```

#### InteractiveAnswerReveal Component
```typescript
interface InteractiveAnswerRevealProps {
  title: string;
  banglaDescription: string;
  examples: string[];
}

const InteractiveAnswerReveal: React.FC<InteractiveAnswerRevealProps> = ({
  title, banglaDescription, examples
}) => {
  const [revealedAnswers, setRevealedAnswers] = useState<{[key: string]: boolean}>({});

  const toggleAnswer = (exampleIndex: number, answerIndex: number) => {
    const key = `${exampleIndex}-${answerIndex}`;
    setRevealedAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const parseExampleWithAnswers = (example: string, exampleIndex: number) => {
    // Parse examples like "Cricket is an [international] game. (Dhaka-2023)"
    const answerPattern = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let answerIndex = 0;
    const parts = [];

    let match;
    while ((match = answerPattern.exec(example)) !== null) {
      // Add text before the answer
      if (match.index > lastIndex) {
        parts.push(example.slice(lastIndex, match.index));
      }

      // Add the interactive answer element
      const key = `${exampleIndex}-${answerIndex}`;
      const isRevealed = revealedAnswers[key];
      const answer = match[1];

      parts.push(
        <button
          key={key}
          onClick={() => toggleAnswer(exampleIndex, answerIndex)}
          className={cn(
            "inline-flex items-center px-2 py-1 rounded text-sm font-medium transition-all duration-200",
            isRevealed 
              ? "bg-success-500/20 text-success-600 border border-success-500/30 hover:bg-success-500/30"
              : "bg-sf-button/20 text-sf-button border border-sf-button/30 hover:bg-sf-button/30"
          )}
        >
          {isRevealed ? answer : <Eye className="h-3 w-3" />}
        </button>
      );

      lastIndex = match.index + match[0].length;
      answerIndex++;
    }

    // Add remaining text
    if (lastIndex < example.length) {
      parts.push(example.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="space-y-6">
      {/* Rule Title */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-sf-text-bold">
          {title}
        </h2>
        <p className="text-sf-text-subtle leading-relaxed">
          {banglaDescription}
        </p>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sf-text-bold">
          Examples
        </h3>
        <div className="space-y-3">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="p-4 bg-neutral-800/50 border border-sf-text-muted/20 rounded-lg"
            >
              <div className="text-sf-text-subtle leading-relaxed">
                {parseExampleWithAnswers(example, index)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-sf-text-muted flex items-center space-x-2">
          <Eye className="h-3 w-3" />
          <span>Click on the eye icons to reveal answers</span>
        </div>
      </div>
    </div>
  );
};
```

## Data Models

### Unified Page Configuration

```typescript
interface UnifiedPageConfig {
  pageType: 'grammar' | 'questions' | 'combined';
  level: 'HSC' | 'SSC';
  title: string;
  description: string;
  statistics: {
    topics: number;
    rules?: number;
    questions?: number;
  };
  sections: {
    showSearch: boolean;
    showFilters: boolean;
    showStats: boolean;
  };
}

const pageConfigurations: Record<string, UnifiedPageConfig> = {
  'grammar-hsc': {
    pageType: 'grammar',
    level: 'HSC',
    title: 'Grammar Rules & Concepts',
    description: 'Explore comprehensive grammar rules, structures, and examples for each topic',
    statistics: { topics: 9, rules: 112 },
    sections: { showSearch: true, showFilters: true, showStats: true }
  },
  'questions-hsc': {
    pageType: 'questions',
    level: 'HSC',
    title: 'Board Questions & Practice',
    description: 'Practice with real board questions from previous years and mock tests',
    statistics: { topics: 9, rules: 112, questions: 74 },
    sections: { showSearch: true, showFilters: true, showStats: true }
  },
  'combined-hsc': {
    pageType: 'combined',
    level: 'HSC',
    title: 'Get Started with Learning',
    description: 'Begin your learning journey with interactive lessons and practice exercises',
    statistics: { topics: 9, rules: 112, questions: 74 },
    sections: { showSearch: true, showFilters: false, showStats: true }
  }
};
```

### Interactive Answer Configuration

```typescript
interface InteractiveAnswerConfig {
  defaultHidden: boolean;
  revealAnimation: 'fade' | 'slide' | 'scale';
  iconType: 'eye' | 'question' | 'plus';
  showHint: boolean;
}

const answerRevealConfig: InteractiveAnswerConfig = {
  defaultHidden: true,
  revealAnimation: 'fade',
  iconType: 'eye',
  showHint: true
};
```

## Error Handling

### Component Error Boundaries

```typescript
interface ComponentErrorBoundaryProps {
  fallback: React.ComponentType<{error: Error; retry: () => void}>;
  children: React.ReactNode;
}

const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({
  fallback: Fallback, children
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const retry = useCallback(() => {
    setHasError(false);
    setError(null);
  }, []);

  if (hasError && error) {
    return <Fallback error={error} retry={retry} />;
  }

  return <>{children}</>;
};
```

### Interactive Element Error Handling

```typescript
interface InteractiveElementErrorProps {
  onError: (error: Error) => void;
  fallbackContent: React.ReactNode;
}

const withInteractiveErrorHandling = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & InteractiveElementErrorProps) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      props.onError(error as Error);
      return <>{props.fallbackContent}</>;
    }
  };
};
```

## Testing Strategy

### Component Consistency Testing

```typescript
interface ConsistencyTestSuite {
  components: string[];
  props: Record<string, any>[];
  expectedBehaviors: string[];
}

const consistencyTests: ConsistencyTestSuite = {
  components: [
    'UnifiedSelectionCard',
    'StandardizedTopicCard',
    'UnifiedPageLayout'
  ],
  props: [
    { type: 'HSC', section: 'grammar' },
    { type: 'HSC', section: 'questions' },
    { type: 'HSC', section: 'combined' }
  ],
  expectedBehaviors: [
    'consistent-sizing',
    'consistent-styling',
    'consistent-hover-effects',
    'consistent-navigation'
  ]
};
```

### Interactive Feature Testing

```typescript
interface InteractiveTestConfig {
  answerReveal: {
    clickResponse: boolean;
    visualFeedback: boolean;
    stateManagement: boolean;
  };
  collapsibleCards: {
    toggleFunctionality: boolean;
    animationSmooth: boolean;
    contentAccessibility: boolean;
  };
}

const interactiveTests: InteractiveTestConfig = {
  answerReveal: {
    clickResponse: true,
    visualFeedback: true,
    stateManagement: true
  },
  collapsibleCards: {
    toggleFunctionality: true,
    animationSmooth: true,
    contentAccessibility: true
  }
};
```

## Performance Optimization

### Bundle Size Optimization

```typescript
interface BundleOptimization {
  removedDependencies: string[];
  codeElimination: string[];
  componentReuse: number;
}

const optimizations: BundleOptimization = {
  removedDependencies: [
    '@supabase/supabase-js',
    'database-related-packages'
  ],
  codeElimination: [
    'duplicate-components',
    'unused-database-functions',
    'redundant-navigation-links'
  ],
  componentReuse: 75 // Percentage improvement in component reuse
};
```

### Runtime Performance

```typescript
interface RuntimeOptimization {
  lazyLoading: boolean;
  memoization: string[];
  eventOptimization: boolean;
}

const runtimeOptimizations: RuntimeOptimization = {
  lazyLoading: true,
  memoization: [
    'filteredTopics',
    'parsedExamples',
    'revealedAnswers'
  ],
  eventOptimization: true
};
```

## Implementation Strategy

### Phase 1: Unified Component System
1. Create UnifiedPageLayout component for consistent structure
2. Implement UnifiedSelectionCard for HSC/SSC selection
3. Enhance StandardizedTopicCard for consistent topic display
4. Test component reusability across all sections

### Phase 2: Homepage Optimization
1. Fix animated card dimensions to prevent layout shifts
2. Simplify navigation links to remove duplicates
3. Optimize dynamic text rotation performance
4. Test responsive behavior across devices

### Phase 3: Interactive Learning Features
1. Implement CollapsibleTopicIntroduction component
2. Create InteractiveAnswerReveal system with eye icons
3. Add smooth animations and transitions
4. Test accessibility and usability

### Phase 4: Performance and Cleanup
1. Remove Supabase and database dependencies
2. Eliminate duplicate and unnecessary files
3. Optimize bundle size and loading performance
4. Comprehensive testing and validation

## Design System Integration

### Consistent Styling

```typescript
interface ConsistentStyling {
  cardStyles: {
    base: string;
    hover: string;
    interactive: string;
  };
  buttonStyles: {
    primary: string;
    secondary: string;
    interactive: string;
  };
  animationStyles: {
    subtle: string;
    hover: string;
    reveal: string;
  };
}

const consistentStyles: ConsistentStyling = {
  cardStyles: {
    base: 'bg-neutral-800 border border-sf-text-muted/20 rounded-xl transition-all duration-300',
    hover: 'hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10',
    interactive: 'hover:-translate-y-1 hover:scale-[1.02] cursor-pointer'
  },
  buttonStyles: {
    primary: 'bg-sf-button text-sf-bg hover:bg-sf-button/90',
    secondary: 'bg-transparent border-2 border-sf-button text-sf-button hover:bg-sf-button hover:text-sf-bg',
    interactive: 'transition-all duration-300 hover:scale-105'
  },
  animationStyles: {
    subtle: 'transition-all duration-300 ease-out',
    hover: 'hover:-translate-y-1 hover:scale-[1.02]',
    reveal: 'transition-all duration-200 ease-in-out'
  }
};
```

This comprehensive design provides a complete foundation for implementing all the UI consistency improvements while maintaining performance, accessibility, and user experience across the entire HSC learning platform.