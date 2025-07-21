# Requirements Document

## Introduction

This feature focuses on analyzing and standardizing the file/folder structure of a Next.js-based non-profit application to ensure it follows industry best practices and naming conventions. The current application appears to be an English grammar learning platform for HSC/SSC students with sections for grammar rules, practice questions, and board questions. The goal is to restructure the application to follow Next.js 13+ App Router conventions while maintaining functionality and improving maintainability.

## Requirements

### Requirement 1

**User Story:** As a developer working on the non-profit application, I want the project structure to follow Next.js 13+ App Router conventions, so that the codebase is maintainable and follows industry standards.

#### Acceptance Criteria

1. WHEN analyzing the current structure THEN the system SHALL identify all deviations from Next.js 13+ App Router patterns
2. WHEN restructuring routes THEN the system SHALL ensure proper use of page.tsx, layout.tsx, loading.tsx, and error.tsx files
3. WHEN organizing API routes THEN the system SHALL follow the /app/api/[feature]/route.ts pattern
4. IF dynamic routes exist THEN the system SHALL use proper bracket notation ([id], [slug], [...params])
5. WHEN creating route groups THEN the system SHALL use parentheses for organization without affecting URL structure

### Requirement 2

**User Story:** As a developer, I want consistent naming conventions across all files and folders, so that the codebase is predictable and easy to navigate.

#### Acceptance Criteria

1. WHEN naming route segments THEN the system SHALL use kebab-case (grammar-items, board-questions)
2. WHEN naming React components THEN the system SHALL use PascalCase (GrammarRulesPage.tsx, QuestionCard.tsx)
3. WHEN naming utility functions THEN the system SHALL use camelCase (formatQuestion.ts, validateAnswer.ts)
4. WHEN naming TypeScript types THEN the system SHALL use PascalCase with descriptive names (Question.types.ts, GrammarRule.types.ts)
5. WHEN naming constants THEN the system SHALL use UPPER_SNAKE_CASE (GRAMMAR_TOPICS.ts, API_ENDPOINTS.ts)
6. WHEN naming folders THEN the system SHALL use kebab-case for routes and camelCase for component directories

### Requirement 3

**User Story:** As a developer, I want the application structure to properly organize grammar learning features, so that related functionality is grouped logically.

#### Acceptance Criteria

1. WHEN organizing grammar topics THEN the system SHALL group HSC and SSC content under appropriate route segments
2. WHEN structuring question types THEN the system SHALL organize completing-sentence, connectors, modifier, narration, transformation, and use-of-verbs consistently
3. WHEN organizing components THEN the system SHALL separate UI components, grammar-specific components, and question components
4. WHEN structuring data THEN the system SHALL organize grammar rules and questions in parallel directory structures
5. WHEN organizing pages THEN the system SHALL maintain clear separation between get-started, grammar-items, and board-questions sections

### Requirement 4

**User Story:** As a developer, I want proper component organization following Next.js patterns, so that components are reusable and maintainable.

#### Acceptance Criteria

1. WHEN organizing UI components THEN the system SHALL keep shadcn/ui components in components/ui directory
2. WHEN organizing feature components THEN the system SHALL group grammar-related and question-related components separately
3. WHEN organizing common components THEN the system SHALL place shared components in components/common directory
4. WHEN organizing layout components THEN the system SHALL create proper layout hierarchy for different sections
5. WHEN organizing form components THEN the system SHALL group all form-related components together

### Requirement 5

**User Story:** As a developer, I want proper TypeScript integration and type organization, so that the application has strong type safety.

#### Acceptance Criteria

1. WHEN organizing types THEN the system SHALL create feature-specific type files (grammar.types.ts, question.types.ts)
2. WHEN defining interfaces THEN the system SHALL use descriptive names that reflect the domain (GrammarRule, Question, Topic)
3. WHEN organizing type definitions THEN the system SHALL separate API types from component prop types
4. WHEN creating shared types THEN the system SHALL place common types in a shared types directory
5. WHEN defining enums THEN the system SHALL use descriptive names for grammar topics and question types

### Requirement 6

**User Story:** As a developer, I want proper API route organization, so that backend endpoints are logically structured and follow RESTful patterns.

#### Acceptance Criteria

1. WHEN organizing API routes THEN the system SHALL create routes for grammar-rules, questions, and topics
2. WHEN structuring API endpoints THEN the system SHALL follow RESTful conventions (GET, POST, PUT, DELETE)
3. WHEN organizing API by feature THEN the system SHALL group related endpoints under feature directories
4. WHEN creating dynamic API routes THEN the system SHALL use proper parameter naming ([topicId], [questionId])
5. WHEN organizing API utilities THEN the system SHALL create shared middleware and validation functions

### Requirement 7

**User Story:** As a developer, I want proper static asset organization, so that images, icons, and documents are easily manageable.

#### Acceptance Criteria

1. WHEN organizing images THEN the system SHALL group by feature (grammar-topics, question-types, ui-elements)
2. WHEN organizing icons THEN the system SHALL separate topic icons from UI icons
3. WHEN organizing documents THEN the system SHALL group educational materials by topic and level
4. WHEN organizing public assets THEN the system SHALL maintain clear folder hierarchy in the public directory
5. WHEN referencing assets THEN the system SHALL use consistent import patterns across components

### Requirement 8

**User Story:** As a developer, I want proper configuration and utility organization, so that shared functionality is easily accessible.

#### Acceptance Criteria

1. WHEN organizing utilities THEN the system SHALL group by functionality (date helpers, string formatters, validation)
2. WHEN organizing hooks THEN the system SHALL create custom hooks for grammar and question management
3. WHEN organizing constants THEN the system SHALL separate API endpoints, grammar topics, and UI constants
4. WHEN organizing services THEN the system SHALL create service layers for API communication
5. WHEN organizing configurations THEN the system SHALL maintain proper Next.js, Tailwind, and TypeScript configs