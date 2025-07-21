# Image Assets Organization

This directory contains all image assets for the English Grammar Learning Platform, organized by feature and purpose.

## Directory Structure

### `/grammar-topics/`
Contains images related to specific grammar topics:
- `completing-sentence-hero.webp` - Hero image for completing sentence topic
- `connectors-illustration.webp` - Visual illustration for connectors
- `modifier-diagram.webp` - Diagram showing modifier usage
- `narration-example.webp` - Example image for narration rules
- `transformation-flow.webp` - Flowchart for transformation rules
- `use-of-verbs-chart.webp` - Chart showing verb usage patterns

### `/question-types/`
Contains images related to different question formats:
- `mcq-example.webp` - Multiple choice question example
- `fill-blanks-sample.webp` - Fill in the blanks sample
- `true-false-format.webp` - True/false question format
- `short-answer-template.webp` - Short answer template
- `essay-guidelines.webp` - Essay writing guidelines

### `/ui-elements/`
Contains general UI and branding images:
- `logo-primary.svg` - Primary application logo
- `logo-secondary.svg` - Secondary logo variant
- `hero-background.webp` - Main hero section background
- `pattern-overlay.svg` - Decorative pattern overlay
- `success-illustration.webp` - Success state illustration
- `error-illustration.webp` - Error state illustration
- `empty-state.webp` - Empty state placeholder

## Naming Conventions

### File Naming Rules
1. Use kebab-case for all file names
2. Include descriptive keywords that indicate purpose
3. Use appropriate file extensions (.webp for photos, .svg for graphics)
4. Include size indicators when multiple sizes exist (e.g., `-sm`, `-md`, `-lg`)

### Examples
- ✅ `completing-sentence-hero.webp`
- ✅ `logo-primary.svg`
- ✅ `success-illustration-lg.webp`
- ❌ `CompletingSentence_Hero.png`
- ❌ `logo.jpg`
- ❌ `img1.gif`

## Optimization Guidelines

### Image Formats
- **WebP**: Preferred for photographs and complex images
- **SVG**: Preferred for logos, icons, and simple graphics
- **PNG**: Fallback for images requiring transparency
- **JPEG**: Fallback for photographs when WebP not supported

### Size Guidelines
- Hero images: Max 1920x1080px, optimized for web
- Illustrations: Max 800x600px
- UI elements: Appropriate size for usage context
- Logos: Vector format (SVG) preferred for scalability

### Performance Optimization
- Compress all images before adding to repository
- Use appropriate quality settings (80-90% for JPEG/WebP)
- Provide multiple sizes for responsive images when needed
- Use lazy loading for non-critical images

## Usage in Components

```typescript
// Import images using Next.js Image component
import Image from 'next/image';
import heroImage from '@/public/images/grammar-topics/completing-sentence-hero.webp';

// Use with proper alt text and optimization
<Image
  src={heroImage}
  alt="Completing sentence grammar topic illustration"
  width={800}
  height={400}
  priority={false}
  placeholder="blur"
/>
```

## Accessibility Requirements

- All images must have descriptive alt text
- Decorative images should have empty alt attributes
- Complex images should include detailed descriptions
- Ensure sufficient color contrast for text overlays