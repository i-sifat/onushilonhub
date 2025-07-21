# Universal Topic Navigation Component

The Universal Topic Navigation component provides a consistent, feature-rich interface for displaying and navigating educational topics across all sections of the application.

## Features

- **Consistent Design**: Unified topic cards with consistent styling across all educational levels
- **Progress Indicators**: Visual progress bars and completion statistics for user tracking
- **Advanced Statistics**: Rule counts, question counts, difficulty levels, and estimated time
- **Search & Filtering**: Real-time search and multi-criteria filtering capabilities
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Flexible props for different use cases and sections

## Usage

### Basic Usage

```tsx
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

export default function MyPage() {
  return (
    <UniversalTopicNavigation 
      level="HSC" 
      section="get-started"
    />
  );
}
```

### Advanced Usage

```tsx
<UniversalTopicNavigation 
  level="HSC" 
  section="grammar-items"
  showSearch={true}
  showFilters={true}
  showStats={true}
  showProgress={true}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `'HSC' \| 'SSC' \| 'BOTH'` | Required | Educational level to display topics for |
| `section` | `'get-started' \| 'grammar-items' \| 'board-questions'` | `'get-started'` | Section type for routing and display |
| `showSearch` | `boolean` | `true` | Show/hide search functionality |
| `showFilters` | `boolean` | `true` | Show/hide filtering options |
| `showStats` | `boolean` | `true` | Show/hide statistics cards |
| `showProgress` | `boolean` | `false` | Show/hide progress indicators |
| `className` | `string` | `''` | Additional CSS classes |

## Features in Detail

### Topic Cards

Each topic card displays:
- **Topic Icon & Name**: Visual identifier and clear title
- **Difficulty Badge**: Easy, Medium, or Hard classification
- **Estimated Time**: Expected completion time in minutes
- **Description**: Brief explanation of the topic
- **Statistics**: Rule count and question count (when enabled)
- **Progress Indicators**: Completion percentage and average score (when enabled)
- **Tags**: Topic-related keywords for better categorization
- **Prerequisites**: Required topics that should be completed first

### Search Functionality

- **Real-time Search**: Instant filtering as you type
- **Multi-field Search**: Searches across topic names, descriptions, and tags
- **Case-insensitive**: Works regardless of capitalization

### Filtering Options

- **Difficulty Filter**: Filter by Easy, Medium, Hard, or All
- **Category Filter**: Filter by Grammar Rules, Questions, Both, or All
- **Sort Options**: Sort by Default order, Name, Difficulty, Rules count, or Questions count
- **Sort Direction**: Ascending or descending order

### Statistics Display

- **Overall Statistics**: Total topics, rules, questions, and average progress
- **Individual Topic Stats**: Rule count and question count per topic
- **Progress Tracking**: Completion rates and performance metrics (mock data for demo)

### Responsive Design

- **Mobile**: Single column layout with stacked cards
- **Tablet**: Two-column grid layout
- **Desktop**: Three-column grid layout with full feature set

## Section-Specific Behavior

### Get Started Section
- Shows progress indicators by default
- Routes to practice pages (`/get-started/[topic]`)
- Emphasizes learning journey and completion tracking

### Grammar Items Section
- Focuses on rule counts and learning materials
- Routes to grammar rule pages (`/grammar-items/[level]/[topic]`)
- Highlights educational content and structure

### Board Questions Section
- Emphasizes question counts and practice materials
- Routes to question pages (`/board-questions/[level]/[topic]`)
- Focuses on exam preparation and practice

## Data Integration

The component automatically integrates with:
- **Topic Configuration**: From `@/data/topics`
- **Grammar Rules Data**: From `@/data/grammar-rules`
- **Questions Data**: From `@/data/questions`

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG compliant color combinations

## Customization

### Custom Styling

```tsx
<UniversalTopicNavigation 
  level="HSC"
  className="my-custom-navigation"
/>
```

### Custom CSS Variables

The component uses CSS custom properties that can be overridden:

```css
.my-custom-navigation {
  --sf-button: #your-primary-color;
  --sf-text-bold: #your-text-color;
  --sf-text-subtle: #your-subtle-color;
}
```

## Performance Considerations

- **Memoized Calculations**: Statistics and filtering are memoized for performance
- **Lazy Loading**: Images and icons are optimized for fast loading
- **Efficient Filtering**: Client-side filtering with optimized algorithms
- **Responsive Images**: Proper image sizing for different screen sizes

## Testing

The component includes comprehensive tests covering:
- Rendering with different props
- Search functionality
- Filtering and sorting
- Statistics display
- Progress indicators
- Accessibility features

Run tests with:
```bash
npm test -- __tests__/components/universal/UniversalTopicNavigation.test.tsx
```

## Examples

See the example page at `/example-topic-navigation` for live demonstrations of different configurations and use cases.

## Migration from Legacy Components

This component replaces several legacy components:
- `HSCTopicsGrid`
- `TopicsGrid`
- `TopicCard` (individual usage)

### Migration Steps

1. Replace legacy component imports
2. Update props to match new interface
3. Remove custom styling that's now built-in
4. Test functionality and appearance

### Before (Legacy)
```tsx
import HSCTopicsGrid from '@/components/grammar/HSCTopicsGrid';

<HSCTopicsGrid level="hsc" isGrammarItems={true} />
```

### After (Universal)
```tsx
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

<UniversalTopicNavigation level="HSC" section="grammar-items" />
```

## Contributing

When contributing to this component:
1. Maintain backward compatibility
2. Add tests for new features
3. Update documentation
4. Follow existing code patterns
5. Ensure accessibility compliance

## Support

For questions or issues with this component, please:
1. Check the existing tests for usage examples
2. Review the example page for implementation patterns
3. Ensure your data structure matches the expected interfaces
4. Verify that required dependencies are installed