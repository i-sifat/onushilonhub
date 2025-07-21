# Implementation Plan

- [x] 1. Set up enhanced TypeScript configuration and type definitions
  - Create comprehensive type definitions for grammar rules, questions, and API responses
  - Set up proper TypeScript path mapping for absolute imports
  - Configure strict TypeScript settings for better type safety
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 2. Create standardized data structure and organization
  - [x] 2.1 Restructure grammar rules data with consistent interfaces
    - Standardize all grammar rule files to use consistent GrammarRule interface
    - Create centralized index file for grammar rules with proper exports
    - Add topic metadata and level information to each rule set
    - _Requirements: 3.1, 3.2, 3.3, 5.1_

  - [x] 2.2 Restructure questions data with enhanced metadata
    - Standardize all question files to use consistent Question interface
    - Add difficulty levels, board information, and year metadata to questions
    - Create centralized index file for questions with proper exports
    - _Requirements: 3.1, 3.2, 3.3, 5.1_

  - [x] 2.3 Create topic configuration system
    - Implement centralized topic configuration with metadata
    - Create topic slugs and routing information
    - Add level-specific topic organization (HSC/SSC)
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Implement Next.js App Router structure with route groups
  - [x] 3.1 Create marketing route group for public pages
    - Set up (marketing) route group with proper layout
    - Move home page and about page to marketing group
    - Implement marketing-specific layout and navigation
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [x] 3.2 Create learning route group for educational content
    - Set up (learning) route group with educational layout
    - Restructure grammar-items, board-questions, and get-started routes
    - Implement consistent route naming with kebab-case
    - Create proper nested layouts for different learning sections
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3_

  - [x] 3.3 Implement dynamic routes with proper parameter naming
    - Create dynamic routes for topics using [topic-slug] pattern
    - Implement dynamic routes for questions using [question-id] pattern
    - Set up catch-all routes for flexible navigation
    - _Requirements: 1.1, 1.4, 2.1, 2.2_

- [x] 4. Restructure and standardize component organization
  - [x] 4.1 Reorganize layout components
    - Move Navbar, Footer to components/layout directory
    - Create Sidebar component for learning sections
    - Implement Breadcrumbs component for navigation
    - Standardize component naming to PascalCase
    - _Requirements: 4.1, 4.4, 2.2_

  - [x] 4.2 Reorganize grammar-specific components
    - Move grammar components to components/grammar directory
    - Rename components to follow PascalCase convention
    - Create reusable GrammarRuleCard and GrammarRulesList components
    - Implement TopicSelector and LevelSelector components
    - _Requirements: 4.2, 4.3, 2.2, 3.2_

  - [x] 4.3 Reorganize question-specific components
    - Move question components to components/questions directory
    - Create reusable QuestionCard and QuestionsList components
    - Implement QuestionFilter component for filtering functionality
    - Standardize component interfaces and props
    - _Requirements: 4.2, 4.3, 2.2, 3.2_

  - [x] 4.4 Consolidate common components
    - Move shared components to components/common directory
    - Create LoadingSpinner and ErrorBoundary components
    - Standardize SearchInput and BackButton components
    - Implement consistent component patterns
    - _Requirements: 4.3, 2.2_

- [x] 5. Implement API routes following RESTful patterns
  - [x] 5.1 Create grammar rules API endpoints
    - Implement /api/grammar-rules route for fetching all rules
    - Create /api/grammar-rules/[topic] route for topic-specific rules
    - Add proper error handling and response formatting
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 5.2 Create questions API endpoints
    - Implement /api/questions route for fetching questions
    - Create /api/questions/[topic] route for topic-specific questions
    - Add filtering capabilities for board, year, and difficulty
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 5.3 Create topics API endpoints
    - Implement /api/topics route for topic configuration
    - Add level-specific topic filtering (HSC/SSC)
    - Create proper API response types and validation
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [x] 6. Create utility functions and service layers
    - [x] 6.1 Implement grammar-related utilities
    - Create formatGrammarRule utility for consistent formatting
    - Implement searchGrammarRules function for search functionality
    - Add validation utilities for grammar rule data
    - _Requirements: 8.1, 8.4, 2.3_

  - [x] 6.2 Implement question-related utilities
    - Create formatQuestion utility for consistent question display
    - Implement filterQuestions function for advanced filtering
    - Add question validation and scoring utilities
    - _Requirements: 8.1, 8.4, 2.3_

  - [x] 6.3 Create custom React hooks
    - Implement useGrammarRules hook for grammar data management
    - Create useQuestions hook for question data management
    - Add useTopics hook for topic configuration management
    - _Requirements: 8.2, 2.3_

  - [x] 6.4 Implement service layer for API communication
    - Create GrammarService for grammar-related API calls
    - Implement QuestionService for question-related API calls
    - Add error handling and retry logic to services
    - _Requirements: 8.4, 6.5_

- [x] 7. Organize static assets and public resources
  - [x] 7.1 Restructure image assets
    - Organize images by feature (grammar-topics, question-types, ui-elements)
    - Implement consistent naming conventions for image files
    - Optimize images for web performance
    - _Requirements: 7.1, 7.4_

  - [x] 7.2 Organize icon assets
    - Separate topic icons from UI icons in organized directories
    - Implement consistent icon naming and sizing
    - Create icon component wrappers for reusability
    - _Requirements: 7.2, 7.4_

  - [x] 7.3 Organize document assets
    - Group educational materials by topic and level
    - Implement proper document naming conventions
    - Create document access utilities and components
    - _Requirements: 7.3, 7.4_

- [x] 8. Implement error handling and loading states
  - [x] 8.1 Create global error handling system
    - Implement global error boundary component
    - Create error.tsx files for route-level error handling
    - Add proper error logging and user feedback
    - _Requirements: 4.4_

  - [x] 8.2 Implement loading states
    - Create loading.tsx files for route-level loading states
    - Implement LoadingSpinner component for consistent loading UI
    - Add skeleton loading states for better user experience
    - _Requirements: 4.4_

- [x] 9. Update configuration files and build setup
  - [x] 9.1 Update Next.js configuration
    - Configure proper static export settings for educational content
    - Set up image optimization for grammar and question assets
    - Configure proper routing and middleware settings
    - _Requirements: 8.5, 1.1_

  - [x] 9.2 Update TypeScript configuration
    - Configure strict TypeScript settings for better type safety
    - Set up proper path mapping for absolute imports
    - Configure build-time type checking
    - _Requirements: 5.1, 5.2, 8.5_

  - [x] 9.3 Update Tailwind CSS configuration
    - Configure custom theme for educational content
    - Set up proper component styling patterns
    - Optimize CSS for production builds
    - _Requirements: 8.5_

- [x] 10. Implement comprehensive testing setup
  - [x] 10.1 Set up component testing
    - Create test files for all major components
    - Implement unit tests for grammar and question components
    - Add integration tests for component interactions
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 10.2 Set up API route testing
    - Create test files for all API endpoints
    - Implement unit tests for API route handlers
    - Add integration tests for API functionality
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 10.3 Set up utility function testing
    - Create test files for all utility functions
    - Implement unit tests for grammar and question utilities
    - Add tests for custom React hooks
    - _Requirements: 8.1, 8.2_

- [x] 11. Update all import statements and references
  - [x] 11.1 Update component imports
    - Replace all relative imports with absolute imports using @ alias
    - Update component references to match new directory structure
    - Fix any broken imports after restructuring
    - _Requirements: 2.1, 2.2, 2.6_

  - [x] 11.2 Update data imports
    - Update all grammar rule and question data imports
    - Fix references to moved data files
    - Ensure proper type imports for all data structures
    - _Requirements: 2.1, 2.2, 5.1, 5.2_

  - [x] 11.3 Update API route references
    - Update all API calls to match new endpoint structure
    - Fix any hardcoded API paths in components
    - Ensure proper error handling for API calls
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 12. Validate and test complete restructured application
  - [x] 12.1 Create missing root page.tsx file
    - Create app/page.tsx that redirects to marketing home page
    - Ensure proper routing from root to marketing section
    - _Requirements: 1.1, 1.2_

  - [x] 12.2 Implement accessibility and performance testing script
    - Create comprehensive accessibility testing script in scripts/accessibility-performance-test.js
    - Add automated testing for keyboard navigation and screen reader compatibility
    - Implement performance metrics validation for educational content loading
    - Add responsive design testing across device sizes
    - _Requirements: 4.1, 4.2, 4.3, 7.1, 7.2, 7.3_

  - [x] 12.3 Validate build and deployment process
    - Ensure application builds successfully with new structure
    - Test static export functionality for deployment
    - Verify all assets load correctly in production build
    - _Requirements: 8.5, 7.4_

- [-] 13. Implement Universal UI System for Educational Content
  - [x] 13.1 Create Universal Combined UI (Grammar + Questions)
    - Build single combined component used by ALL topics (narration, transformation, modifier, etc.)
    - Implement 4-column layout: Left 25% rules + Right 75% questions + Top filters
    - Create universal filtering system (search, board, year, rule, category)
    - Handle all question types (passage+blanks, direct/indirect speech, simple questions)
    - Use single data source per topic (rules file + questions file)
    - Eliminate current UI inconsistencies between topics
    - _Requirements: 2.2, 3.2, 4.2, 4.3_

  - [x] 13.2 Create Universal Questions UI (Questions Only)
    - Build single questions component used by ALL topics in board-questions section
    - Implement consistent question card design across all question formats
    - Add advanced filtering (board, year, difficulty, topic, question type)
    - Create pagination and infinite scroll for large question sets
    - Use single questions data source per topic
    - Replace all existing topic-specific question components
    - _Requirements: 2.2, 3.2, 4.2, 4.3_

  - [x] 13.3 Create Universal Grammar UI (Grammar Only)
    - Build single grammar component used by ALL topics in grammar-items section
    - Display rules, structures, examples in consistent format
    - Implement rule categorization and advanced search
    - Create expandable rule cards with consistent styling
    - Use single rules data source per topic
    - Replace all existing topic-specific grammar components
    - _Requirements: 2.2, 3.2, 4.2, 4.3_

  - [x] 13.4 Create Universal Topic Navigation Component
    - Build consistent topic overview for HSC/SSC sections
    - Implement topic cards with progress indicators and statistics
    - Add topic-specific metadata (rule count, question count, difficulty)
    - Create unified navigation patterns across all educational levels
    - Implement topic search and filtering capabilities
    - _Requirements: 1.4, 2.2, 3.1, 3.2_

  - [x] 13.5 Implement Premium UI/UX Design System
    - Create modern, educational-focused color scheme and typography
    - Implement consistent spacing, shadows, and border radius system
    - Design premium iconography and visual elements
    - Create smooth animations and micro-interactions
    - Implement dark/light theme support
    - Add accessibility features (keyboard navigation, screen reader support)
    - _Requirements: 4.1, 4.2, 4.3, 7.1, 7.2_

  - [x] 13.6 Replace All Existing Pages with Universal Components
    - Update all HSC get-started pages to use Universal Combined UI
    - Update all HSC board-questions pages to use Universal Questions UI
    - Update all HSC grammar-items pages to use Universal Grammar UI
    - Update topic overview pages to use Universal Topic Navigation
    - Remove all topic-specific UI components to eliminate duplication
    - Ensure consistent experience across all educational sections
    - _Requirements: 1.4, 2.2, 3.2, 4.2_