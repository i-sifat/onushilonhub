/**
 * Document management utilities for the English Grammar Learning Platform
 */

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
  description?: string;
  tags?: string[];
}

export type DocumentCategory = Document['category'];
export type DocumentLevel = Document['level'];

/**
 * Sample document data - In a real application, this would come from a database or CMS
 */
const sampleDocuments: Document[] = [
  // Grammar Guides
  {
    id: 'hsc-completing-sentence-guide',
    title: 'HSC Completing Sentence Guide',
    filename: 'hsc-completing-sentence-guide.pdf',
    category: 'grammar-guides',
    level: 'HSC',
    topic: 'completing-sentence',
    fileSize: 2048000, // 2MB
    lastUpdated: new Date('2024-01-15'),
    downloadUrl: '/documents/grammar-guides/hsc-completing-sentence-guide.pdf',
    description: 'Comprehensive guide for HSC level completing sentence exercises',
    tags: ['hsc', 'completing-sentence', 'grammar', 'guide']
  },
  {
    id: 'ssc-connectors-guide',
    title: 'SSC Connectors Guide',
    filename: 'ssc-connectors-guide.pdf',
    category: 'grammar-guides',
    level: 'SSC',
    topic: 'connectors',
    fileSize: 1536000, // 1.5MB
    lastUpdated: new Date('2024-01-10'),
    downloadUrl: '/documents/grammar-guides/ssc-connectors-guide.pdf',
    description: 'Basic connectors and their usage for SSC students',
    tags: ['ssc', 'connectors', 'grammar', 'guide']
  },
  // Question Banks
  {
    id: 'hsc-transformation-questions',
    title: 'HSC Transformation Questions',
    filename: 'hsc-transformation-questions.pdf',
    category: 'question-banks',
    level: 'HSC',
    topic: 'transformation',
    fileSize: 3072000, // 3MB
    lastUpdated: new Date('2024-01-20'),
    downloadUrl: '/documents/question-banks/hsc-transformation-questions.pdf',
    description: '250+ transformation questions for HSC preparation',
    tags: ['hsc', 'transformation', 'questions', 'practice']
  },
  // Study Materials
  {
    id: 'exam-preparation-strategy',
    title: 'Exam Preparation Strategy',
    filename: 'exam-preparation-strategy.pdf',
    category: 'study-materials',
    level: 'GENERAL',
    fileSize: 1024000, // 1MB
    lastUpdated: new Date('2024-01-05'),
    downloadUrl: '/documents/study-materials/exam-preparation-strategy.pdf',
    description: 'Comprehensive exam preparation guide for both HSC and SSC',
    tags: ['exam', 'preparation', 'strategy', 'general']
  },
  // Reference Sheets
  {
    id: 'grammar-formulas-table',
    title: 'Grammar Formulas Table',
    filename: 'grammar-formulas-table.pdf',
    category: 'reference-sheets',
    level: 'GENERAL',
    fileSize: 512000, // 512KB
    lastUpdated: new Date('2024-01-12'),
    downloadUrl: '/documents/reference-sheets/grammar-formulas-table.pdf',
    description: 'Quick reference table of essential grammar formulas',
    tags: ['formulas', 'reference', 'quick-lookup', 'general']
  }
];

/**
 * Get all documents
 */
export function getAllDocuments(): Document[] {
  return sampleDocuments;
}

/**
 * Get documents by category
 */
export function getDocumentsByCategory(category: DocumentCategory): Document[] {
  return sampleDocuments.filter(doc => doc.category === category);
}

/**
 * Get documents by educational level
 */
export function getDocumentsByLevel(level: DocumentLevel): Document[] {
  return sampleDocuments.filter(doc => doc.level === level || doc.level === 'GENERAL');
}

/**
 * Get documents by topic
 */
export function getDocumentsByTopic(topic: string): Document[] {
  return sampleDocuments.filter(doc => doc.topic === topic);
}

/**
 * Get document by ID
 */
export function getDocumentById(id: string): Document | undefined {
  return sampleDocuments.find(doc => doc.id === id);
}

/**
 * Search documents by title, description, or tags
 */
export function searchDocuments(query: string): Document[] {
  const lowercaseQuery = query.toLowerCase();
  return sampleDocuments.filter(doc => 
    doc.title.toLowerCase().includes(lowercaseQuery) ||
    doc.description?.toLowerCase().includes(lowercaseQuery) ||
    doc.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Generate download URL for a document
 */
export function generateDownloadUrl(filename: string, category?: DocumentCategory): string {
  if (category) {
    return `/documents/${category}/${filename}`;
  }
  return `/documents/${filename}`;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format last updated date for display
 */
export function formatLastUpdated(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Updated yesterday';
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `Updated ${Math.ceil(diffDays / 30)} months ago`;
  
  return `Updated ${Math.ceil(diffDays / 365)} years ago`;
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: DocumentCategory): string {
  const categoryNames: Record<DocumentCategory, string> = {
    'grammar-guides': 'Grammar Guides',
    'question-banks': 'Question Banks',
    'study-materials': 'Study Materials',
    'reference-sheets': 'Reference Sheets'
  };
  
  return categoryNames[category];
}

/**
 * Get level display name
 */
export function getLevelDisplayName(level: DocumentLevel): string {
  const levelNames: Record<DocumentLevel, string> = {
    'HSC': 'Higher Secondary Certificate',
    'SSC': 'Secondary School Certificate',
    'GENERAL': 'General'
  };
  
  return levelNames[level];
}

/**
 * Filter documents by multiple criteria
 */
export interface DocumentFilters {
  category?: DocumentCategory;
  level?: DocumentLevel;
  topic?: string;
  tags?: string[];
  search?: string;
}

export function filterDocuments(filters: DocumentFilters): Document[] {
  let filteredDocuments = sampleDocuments;
  
  if (filters.category) {
    filteredDocuments = filteredDocuments.filter(doc => doc.category === filters.category);
  }
  
  if (filters.level) {
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.level === filters.level || doc.level === 'GENERAL'
    );
  }
  
  if (filters.topic) {
    filteredDocuments = filteredDocuments.filter(doc => doc.topic === filters.topic);
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.tags?.some(tag => filters.tags!.includes(tag))
    );
  }
  
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.title.toLowerCase().includes(query) ||
      doc.description?.toLowerCase().includes(query) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return filteredDocuments;
}