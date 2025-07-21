# Document Assets Organization

This directory contains educational documents and materials for the English Grammar Learning Platform, organized by type and educational level.

## Directory Structure

### `/grammar-guides/`
Contains comprehensive grammar guides and explanations:
- `hsc-completing-sentence-guide.pdf` - Complete guide for HSC completing sentence
- `ssc-completing-sentence-guide.pdf` - Complete guide for SSC completing sentence
- `hsc-connectors-guide.pdf` - HSC connectors comprehensive guide
- `ssc-connectors-guide.pdf` - SSC connectors comprehensive guide
- `hsc-modifier-guide.pdf` - HSC modifier usage guide
- `ssc-modifier-guide.pdf` - SSC modifier usage guide
- `hsc-narration-guide.pdf` - HSC narration rules guide
- `ssc-narration-guide.pdf` - SSC narration rules guide
- `hsc-transformation-guide.pdf` - HSC transformation guide
- `ssc-transformation-guide.pdf` - SSC transformation guide
- `hsc-use-of-verbs-guide.pdf` - HSC verb usage guide
- `ssc-use-of-verbs-guide.pdf` - SSC verb usage guide

### `/question-banks/`
Contains practice question collections:
- `hsc-completing-sentence-questions.pdf` - HSC completing sentence question bank
- `ssc-completing-sentence-questions.pdf` - SSC completing sentence question bank
- `hsc-connectors-questions.pdf` - HSC connectors question bank
- `ssc-connectors-questions.pdf` - SSC connectors question bank
- `hsc-modifier-questions.pdf` - HSC modifier question bank
- `ssc-modifier-questions.pdf` - SSC modifier question bank
- `hsc-narration-questions.pdf` - HSC narration question bank
- `ssc-narration-questions.pdf` - SSC narration question bank
- `hsc-transformation-questions.pdf` - HSC transformation question bank
- `ssc-transformation-questions.pdf` - SSC transformation question bank
- `hsc-board-questions-2020-2024.pdf` - Recent HSC board questions
- `ssc-board-questions-2020-2024.pdf` - Recent SSC board questions

### `/study-materials/`
Contains supplementary study materials:
- `hsc-grammar-syllabus.pdf` - HSC grammar syllabus overview
- `ssc-grammar-syllabus.pdf` - SSC grammar syllabus overview
- `exam-preparation-tips.pdf` - General exam preparation guidelines
- `common-mistakes-guide.pdf` - Common grammar mistakes to avoid
- `quick-revision-notes.pdf` - Quick revision notes for all topics
- `grammar-formulas-cheat-sheet.pdf` - Essential grammar formulas
- `board-exam-patterns.pdf` - Analysis of board exam patterns

### `/reference-sheets/`
Contains quick reference materials:
- `completing-sentence-rules-reference.pdf` - Quick rules reference
- `connectors-list-reference.pdf` - Comprehensive connectors list
- `modifier-types-reference.pdf` - Types of modifiers reference
- `narration-rules-reference.pdf` - Narration rules quick reference
- `transformation-patterns-reference.pdf` - Common transformation patterns
- `verb-forms-reference.pdf` - Irregular verb forms reference
- `preposition-usage-reference.pdf` - Preposition usage guide
- `punctuation-rules-reference.pdf` - Punctuation rules reference

## Naming Conventions

### File Naming Rules
1. Use kebab-case for all file names
2. Include level indicator (hsc/ssc) at the beginning
3. Include topic name in the middle
4. Include document type at the end
5. Use appropriate file extensions (.pdf, .docx, .txt)

### Examples
- ✅ `hsc-completing-sentence-guide.pdf`
- ✅ `ssc-connectors-questions.pdf`
- ✅ `grammar-formulas-cheat-sheet.pdf`
- ❌ `HSC_Completing_Sentence.pdf`
- ❌ `connectorsGuide.docx`
- ❌ `doc1.pdf`

## Document Categories

### By Educational Level
- **HSC (Higher Secondary Certificate)**: Advanced level materials
- **SSC (Secondary School Certificate)**: Foundation level materials
- **General**: Materials applicable to both levels

### By Document Type
- **Guides**: Comprehensive explanations and tutorials
- **Question Banks**: Collections of practice questions
- **Reference Sheets**: Quick lookup materials
- **Study Materials**: Supplementary learning resources

## Access Control and Organization

### File Size Guidelines
- Keep individual files under 10MB for web performance
- Compress PDFs for optimal loading
- Use appropriate quality settings for scanned documents

### Version Control
- Include version numbers for updated documents
- Use date stamps for time-sensitive materials
- Maintain changelog for significant updates

## Document Access Utilities

Create utility functions for document management:

```typescript
// lib/utils/document-helpers.ts
export interface Document {
  id: string;
  title: string;
  filename: string;
  category: 'grammar-guides' | 'question-banks' | 'study-materials' | 'reference-sheets';
  level: 'HSC' | 'SSC' | 'GENERAL';
  topic?: string;
  fileSize: number;
  lastUpdated: Date;
  downloadUrl: string;
}

export function getDocumentsByCategory(category: string): Document[] {
  // Implementation to fetch documents by category
}

export function getDocumentsByLevel(level: string): Document[] {
  // Implementation to fetch documents by level
}

export function getDocumentsByTopic(topic: string): Document[] {
  // Implementation to fetch documents by topic
}

export function generateDownloadUrl(filename: string): string {
  return `/documents/${filename}`;
}
```

## Usage in Components

```typescript
// components/documents/DocumentCard.tsx
import { Document } from '@/lib/utils/document-helpers';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold">{document.title}</h3>
      <p className="text-sm text-muted-foreground">
        {document.level} • {document.category}
      </p>
      <a
        href={document.downloadUrl}
        download
        className="inline-flex items-center mt-2 text-primary hover:underline"
      >
        Download PDF
      </a>
    </div>
  );
}
```

## Accessibility Requirements

- Provide alternative formats for accessibility (HTML versions of PDFs)
- Include proper document descriptions and metadata
- Ensure documents are screen reader compatible
- Provide text alternatives for image-based content

## SEO and Discoverability

- Use descriptive filenames that include relevant keywords
- Include proper meta descriptions for document pages
- Create sitemap entries for important documents
- Implement proper internal linking to documents