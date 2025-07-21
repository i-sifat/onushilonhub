# Design Document

## Overview

This design outlines the standardization of a Next.js 13+ App Router-based English grammar learning platform for HSC/SSC students. The current application has a functional structure but lacks consistency in naming conventions and optimal organization patterns. The restructuring will follow Next.js best practices while maintaining the educational content organization and improving developer experience.

### Current State Analysis

The application currently uses:
- Next.js 15.4.1 with App Router
- TypeScript with strict configuration
- Tailwind CSS with custom theme
- Supabase for backend services
- Static export configuration
- Comprehensive UI component library (shadcn/ui)

### Target Architecture

The redesigned structure will follow a feature-based organization with clear separation of concerns, consistent naming conventions, and optimal Next.js patterns.

## Architecture

### High-Level Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Route group for public pages
│   ├── (learning)/              # Route group for learning features
│   ├── api/                     # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Global loading UI
│   ├── error.tsx                # Global error UI
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── common/                  # Shared components
│   ├── layout/                  # Layout components
│   ├── grammar/                 # Grammar-specific components
│   ├── questions/               # Question-specific components
│   └── forms/                   # Form components
├── lib/                         # Utilities and configurations
│   ├── utils/                   # Utility functions
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API service layers
│   ├── validations/             # Zod schemas
│   └── constants/               # Application constants
├── types/                       # TypeScript type definitions
│   ├── grammar.types.ts         # Grammar-related types
│   ├── question.types.ts        # Question-related types
│   └── api.types.ts             # API response types
├── data/                        # Static data and content
│   ├── grammar-rules/           # Grammar rule definitions
│   ├── questions/               # Question datasets
│   └── topics/                  # Topic configurations
├── public/                      # Static assets
│   ├── images/                  # Image assets
│   ├── icons/                   # Icon assets
│   └── documents/               # Document assets
└── config files                 # Configuration files
```

### Route Organization Strategy

The application will use Next.js route groups to organize features logically while maintaining clean URLs:

1. **Marketing Routes** `(marketing)`: Public-facing pages
2. **Learning Routes** `(learning)`: Educational content and tools
3. **API Routes**: Backend endpoints following RESTful patterns

## Components and Interfaces

### Component Architecture

#### 1. Layout Components (`components/layout/`)
- `Navbar.tsx` - Main navigation component
- `Footer.tsx` - Site footer
- `Sidebar.tsx` - Learning section sidebar
- `Breadcrumbs.tsx` - Navigation breadcrumbs

#### 2. Grammar Components (`components/grammar/`)
- `GrammarRuleCard.tsx` - Individual rule display
- `GrammarRulesList.tsx` - List of grammar rules
- `TopicSelector.tsx` - Topic selection interface
- `LevelSelector.tsx` - HSC/SSC level selector

#### 3. Question Components (`components/questions/`)
- `QuestionCard.tsx` - Individual question display
- `QuestionsList.tsx` - List of questions
- `QuestionFilter.tsx` - Filtering interface
- `AnswerInput.tsx` - Answer input component

#### 4. Common Components (`components/common/`)
- `SearchInput.tsx` - Reusable search component
- `BackButton.tsx` - Navigation back button
- `LoadingSpinner.tsx` - Loading indicator
- `ErrorBoundary.tsx` - Error handling component

### Interface Definitions

#### Core Types Structure

```typescript
// types/grammar.types.ts
export interface GrammarRule {
  id: number;
  ruleNo: string;
  title: string;
  bengali: string;
  description: string;
  structures: string[];
  examples: string[];
  level: 'HSC' | 'SSC';
  topic: GrammarTopic;
}

export interface GrammarTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  level: 'HSC' | 'SSC' | 'BOTH';
}

// types/question.types.ts
export interface Question {
  id: number;
  text: string;
  answer: string;
  explanation?: string;
  topic: string;
  level: 'HSC' | 'SSC';
  board?: string;
  year?: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

// types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

## Data Models

### Grammar Rules Data Structure

The grammar rules will be organized by topic with consistent interfaces:

```typescript
// data/grammar-rules/index.ts
export interface GrammarRuleData {
  topic: string;
  slug: string;
  level: 'HSC' | 'SSC' | 'BOTH';
  rules: GrammarRule[];
}

// Individual topic files
// data/grammar-rules/completing-sentence.ts
// data/grammar-rules/connectors.ts
// etc.
```

### Questions Data Structure

Questions will follow a similar pattern with enhanced metadata:

```typescript
// data/questions/index.ts
export interface QuestionData {
  topic: string;
  slug: string;
  level: 'HSC' | 'SSC';
  questions: Question[];
}
```

### Topic Configuration

```typescript
// data/topics/index.ts
export interface TopicConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  level: 'HSC' | 'SSC' | 'BOTH';
  order: number;
  isActive: boolean;
}
```

## Error Handling

### Error Boundary Strategy

1. **Global Error Boundary**: Catch-all for unhandled errors
2. **Route-Level Error Pages**: Specific error handling per route
3. **Component-Level Error Handling**: Graceful degradation for components

### Error Types

```typescript
// types/error.types.ts
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export enum ErrorCodes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED'
}
```

## Testing Strategy

### Testing Structure

```
__tests__/
├── components/           # Component tests
├── pages/               # Page tests
├── api/                 # API route tests
├── utils/               # Utility function tests
└── e2e/                 # End-to-end tests
```

### Testing Approach

1. **Unit Tests**: Individual components and utilities
2. **Integration Tests**: Component interactions and API endpoints
3. **E2E Tests**: Critical user journeys
4. **Accessibility Tests**: WCAG compliance testing

### Testing Tools

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **axe-core**: Accessibility testing

## Performance Optimization

### Next.js Optimizations

1. **Static Generation**: Pre-generate grammar rules and questions
2. **Image Optimization**: Use Next.js Image component
3. **Code Splitting**: Automatic route-based splitting
4. **Bundle Analysis**: Regular bundle size monitoring

### Data Loading Strategy

1. **Static Data**: Grammar rules and questions as static imports
2. **Dynamic Loading**: User-specific data via API
3. **Caching**: Implement appropriate caching strategies
4. **Prefetching**: Strategic prefetching of related content

## Security Considerations

### Data Protection

1. **Input Validation**: Zod schemas for all inputs
2. **XSS Prevention**: Proper content sanitization
3. **CSRF Protection**: Built-in Next.js protections
4. **Rate Limiting**: API endpoint protection

### Content Security

1. **Static Content**: Grammar rules and questions are static
2. **User Data**: Minimal user data collection
3. **Third-party Integration**: Secure Supabase integration

## Migration Strategy

### Phase 1: Structure Preparation
1. Create new directory structure
2. Set up type definitions
3. Prepare component templates

### Phase 2: Content Migration
1. Migrate grammar rules data
2. Migrate questions data
3. Update component imports

### Phase 3: Route Restructuring
1. Implement new route structure
2. Update navigation components
3. Test all routes and functionality

### Phase 4: Optimization
1. Implement performance optimizations
2. Add error handling
3. Enhance accessibility

## Development Guidelines

### Naming Conventions

1. **Files**: kebab-case for routes, PascalCase for components
2. **Variables**: camelCase for variables and functions
3. **Constants**: UPPER_SNAKE_CASE for constants
4. **Types**: PascalCase with descriptive names

### Code Organization

1. **Feature-based**: Group related functionality together
2. **Separation of Concerns**: Clear boundaries between layers
3. **Reusability**: Maximize component and utility reuse
4. **Maintainability**: Clear, documented, and testable code

### Import Strategy

```typescript
// Absolute imports using @ alias
import { GrammarRule } from '@/types/grammar.types';
import { Button } from '@/components/ui/button';
import { formatQuestion } from '@/lib/utils/question-helpers';

// Relative imports for closely related files
import './component.styles.css';
```

This design provides a comprehensive foundation for restructuring the application while maintaining functionality and improving maintainability, scalability, and developer experience.