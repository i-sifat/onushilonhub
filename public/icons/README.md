# Icon Assets Organization

This directory contains all icon assets for the English Grammar Learning Platform, organized by purpose and usage context.

## Directory Structure

### `/topics/`
Contains icons representing specific grammar topics:
- `completing-sentence.svg` - Icon for completing sentence topic
- `connectors.svg` - Icon for connectors topic
- `modifier.svg` - Icon for modifier topic
- `narration.svg` - Icon for narration topic
- `transformation.svg` - Icon for transformation topic
- `use-of-verbs.svg` - Icon for use of verbs topic
- `preposition.svg` - Icon for preposition topic
- `punctuation.svg` - Icon for punctuation topic
- `synonym-antonym.svg` - Icon for synonym-antonym topic

### `/ui/`
Contains general user interface icons:
- `home.svg` - Home/dashboard icon
- `search.svg` - Search functionality icon
- `menu.svg` - Navigation menu icon
- `close.svg` - Close/dismiss icon
- `arrow-left.svg` - Left arrow navigation
- `arrow-right.svg` - Right arrow navigation
- `arrow-up.svg` - Up arrow
- `arrow-down.svg` - Down arrow
- `chevron-left.svg` - Left chevron
- `chevron-right.svg` - Right chevron
- `chevron-up.svg` - Up chevron
- `chevron-down.svg` - Down chevron

### `/actions/`
Contains icons for user actions and states:
- `play.svg` - Start/play action
- `pause.svg` - Pause action
- `stop.svg` - Stop action
- `refresh.svg` - Refresh/reload action
- `download.svg` - Download action
- `upload.svg` - Upload action
- `edit.svg` - Edit/modify action
- `delete.svg` - Delete/remove action
- `save.svg` - Save action
- `cancel.svg` - Cancel action
- `check.svg` - Success/complete state
- `warning.svg` - Warning state
- `error.svg` - Error state
- `info.svg` - Information state

## Naming Conventions

### File Naming Rules
1. Use kebab-case for all icon file names
2. Use descriptive, action-oriented names
3. Always use `.svg` extension for scalability
4. Include size suffix only when multiple sizes needed (e.g., `-16`, `-24`, `-32`)

### Examples
- ✅ `completing-sentence.svg`
- ✅ `arrow-left.svg`
- ✅ `check-circle-24.svg`
- ❌ `CompletingSentence.svg`
- ❌ `leftArrow.svg`
- ❌ `icon1.png`

## Icon Specifications

### Size Standards
- **Small**: 16x16px - For inline text and small UI elements
- **Medium**: 24x24px - For buttons and navigation (default)
- **Large**: 32x32px - For prominent actions and headers
- **Extra Large**: 48x48px - For feature highlights and empty states

### Design Guidelines
- Use consistent stroke width (1.5px recommended)
- Maintain consistent visual weight across icon set
- Use simple, recognizable shapes
- Ensure icons work well at small sizes
- Follow accessibility guidelines for icon usage

### Color Guidelines
- Icons should be monochrome (single color)
- Use `currentColor` for SVG fill/stroke to inherit text color
- Avoid hardcoded colors in SVG files
- Let CSS control icon colors for theming

## Icon Component Wrapper

Create reusable icon components for consistent usage:

```typescript
// components/common/Icon.tsx
import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const iconSize = iconSizes[size];
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      className={className}
      {...props}
    >
      <use href={`/icons/${name}.svg#icon`} />
    </svg>
  );
}
```

## Usage Examples

### In Components
```typescript
import { Icon } from '@/components/common/Icon';

// Topic icon
<Icon name="topics/completing-sentence" size="md" />

// UI icon
<Icon name="ui/search" size="sm" />

// Action icon
<Icon name="actions/check" size="lg" className="text-green-500" />
```

### With Next.js Image (for complex icons)
```typescript
import Image from 'next/image';
import completingSentenceIcon from '@/public/icons/topics/completing-sentence.svg';

<Image
  src={completingSentenceIcon}
  alt="Completing sentence topic"
  width={24}
  height={24}
/>
```

## Accessibility Requirements

- Always provide meaningful alt text or aria-labels
- Use `aria-hidden="true"` for decorative icons
- Ensure icons have sufficient color contrast
- Provide text alternatives for icon-only buttons
- Consider screen reader compatibility

### Example Accessible Usage
```typescript
// Decorative icon
<Icon name="ui/arrow-right" aria-hidden="true" />

// Functional icon with label
<button aria-label="Search questions">
  <Icon name="ui/search" />
</button>

// Icon with visible text
<button>
  <Icon name="actions/save" />
  Save Progress
</button>
```