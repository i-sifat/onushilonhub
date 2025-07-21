# Type Definitions

This directory contains comprehensive TypeScript type definitions for the Grammar Learning Platform.

## File Structure

- `grammar.types.ts` - Grammar rules, topics, and related component types
- `question.types.ts` - Questions, filters, and question-related component types  
- `api.types.ts` - API responses, requests, and error handling types
- `common.types.ts` - Shared utility types and common interfaces
- `component.types.ts` - React component prop types and UI component interfaces
- `data.types.ts` - Data structure types for grammar rules and questions
- `app.d.ts` - Global type declarations and module declarations
- `index.ts` - Main export file that re-exports all types

## Usage

### Importing Types

```typescript
// Import specific types
import { GrammarRule, GrammarTopic } from '@/types/grammar.types';
import { Question, QuestionFilter } from '@/types/question.types';

// Import from main index (recommended)
import { GrammarRule, Question, ApiResponse } from '@/types';
```

### Grammar Types

```typescript
// Grammar rule definition
const rule: GrammarRule = {
  id: 1,
  title: "Conditional Sentences",
  bengali: "শর্তসাপেক্ষ বাক্য",
  description: "Rules for conditional sentences",
  structures: ["If + present, will + base form"],
  examples: ["If it rains, I will stay home."],
  level: "HSC",
  topic: "completing-sentence"
};

// Grammar topic configuration
const topic: GrammarTopic = {
  id: "1",
  name: "Completing Sentence",
  slug: "completing-sentence",
  description: "Learn to complete sentences",
  level: "HSC",
  order: 1,
  isActive: true
};
```

### Question Types

```typescript
// Question definition
const question: Question = {
  id: "dhaka-2024-a",
  topic: "completing-sentence",
  question: "If I had money, I ___",
  answer: "would buy a car",
  level: "HSC",
  board: "Dhaka",
  year: 2024,
  difficulty: "MEDIUM",
  ruleId: 141
};

// Question filter
const filter: QuestionFilter = {
  topic: "completing-sentence",
  level: "HSC",
  board: "Dhaka",
  year: 2024,
  difficulty: "MEDIUM"
};
```

### API Types

```typescript
// API response
const response: ApiResponse<GrammarRule[]> = {
  data: [rule],
  success: true,
  message: "Rules fetched successfully",
  meta: {
    total: 1,
    page: 1,
    limit: 20
  }
};

// API request
const request: GrammarRulesRequest = {
  topic: "completing-sentence",
  level: "HSC",
  pagination: { page: 1, limit: 20 }
};
```

### Component Props

```typescript
// Component props with proper typing
interface GrammarRuleCardProps {
  rule: GrammarRule;
  showTopic?: boolean;
  onRuleClick?: (rule: GrammarRule) => void;
}

const GrammarRuleCard: React.FC<GrammarRuleCardProps> = ({ 
  rule, 
  showTopic = false, 
  onRuleClick 
}) => {
  // Component implementation
};
```

## Type Safety Features

### Strict TypeScript Configuration

The project uses strict TypeScript settings for enhanced type safety:

- `strict: true` - Enables all strict type checking options
- `noUnusedLocals: true` - Reports errors on unused local variables
- `noUnusedParameters: true` - Reports errors on unused parameters
- `exactOptionalPropertyTypes: true` - Ensures optional properties are handled correctly
- `noImplicitReturns: true` - Ensures all code paths return a value
- `noUncheckedIndexedAccess: true` - Adds undefined to index signature results

### Path Mapping

Absolute imports are configured for better organization:

```typescript
// Instead of relative imports
import { GrammarRule } from '../../../types/grammar.types';

// Use absolute imports
import { GrammarRule } from '@/types/grammar.types';
```

### Type Guards

Use type guards for runtime type checking:

```typescript
function isGrammarRule(obj: any): obj is GrammarRule {
  return obj && 
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    Array.isArray(obj.structures);
}
```

## Best Practices

1. **Use specific types** instead of `any` whenever possible
2. **Leverage union types** for controlled values (e.g., `GrammarLevel = 'HSC' | 'SSC' | 'BOTH'`)
3. **Use optional properties** with `?` for non-required fields
4. **Extend base interfaces** to avoid duplication
5. **Use generic types** for reusable components and functions
6. **Document complex types** with JSDoc comments

## Migration from Legacy Types

The legacy types in `index.ts` are maintained for backward compatibility. New code should use the specific type files:

```typescript
// Legacy (still supported)
import { Question } from '@/types';

// Preferred for new code
import { Question } from '@/types/question.types';
```

## Contributing

When adding new types:

1. Place them in the appropriate type file based on domain
2. Export them from the main `index.ts` file
3. Update this README if adding new type categories
4. Ensure all types are properly documented
5. Add examples for complex type usage