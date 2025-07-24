/**
 * Animation Utilities for HSC UI Improvements
 * 
 * This file provides consistent animation classes and utilities
 * for subtle, professional animations throughout the website.
 */

import { cn } from '@/lib/utils';

// Base animation classes for consistent timing and easing
export const animationBase = {
  // Transition durations
  fast: 'duration-150',
  normal: 'duration-200',
  slow: 'duration-300',
  slower: 'duration-500',
  
  // Easing functions
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  easeInOut: 'ease-in-out',
  
  // Combined base classes
  transition: 'transition-all duration-200 ease-out',
  transitionFast: 'transition-all duration-150 ease-out',
  transitionSlow: 'transition-all duration-300 ease-out',
};

// Button animation classes
export const buttonAnimations = {
  // Hover effects
  hoverLift: 'hover:-translate-y-0.5 hover:shadow-md',
  hoverScale: 'hover:scale-[1.02]',
  hoverGlow: 'hover:shadow-lg hover:shadow-sf-button/10',
  
  // Click effects
  clickScale: 'active:scale-[0.98] active:duration-150',
  clickPress: 'active:translate-y-0 active:shadow-sm',
  
  // Combined button animations
  subtle: cn(
    animationBase.transition,
    'hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md',
    'active:scale-[0.98] active:duration-150'
  ),
  
  primary: cn(
    animationBase.transition,
    'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sf-button/10',
    'active:scale-[0.98] active:duration-150'
  ),
  
  ghost: cn(
    animationBase.transition,
    'hover:scale-[1.02]',
    'active:scale-[0.98] active:duration-150'
  ),
};

// Card animation classes
export const cardAnimations = {
  // Hover effects
  hoverLift: 'hover:-translate-y-1',
  hoverScale: 'hover:scale-[1.01]',
  hoverScaleLarge: 'hover:scale-[1.02]',
  hoverGlow: 'hover:shadow-lg hover:shadow-sf-button/10',
  hoverBorder: 'hover:border-sf-button/50',
  
  // Combined card animations
  subtle: cn(
    animationBase.transitionSlow,
    'hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg hover:shadow-sf-button/10'
  ),
  
  interactive: cn(
    animationBase.transitionSlow,
    'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-sf-button/10',
    'hover:border-sf-button/50 cursor-pointer'
  ),
  
  selection: cn(
    animationBase.transitionSlow,
    'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-sf-button/10',
    'hover:border-sf-button/50 cursor-pointer group'
  ),
};

// Input animation classes
export const inputAnimations = {
  focus: cn(
    animationBase.transition,
    'focus:scale-[1.01] focus:shadow-md focus:border-sf-button/50'
  ),
  
  hover: cn(
    animationBase.transition,
    'hover:border-sf-button/30 hover:shadow-sm'
  ),
  
  combined: cn(
    animationBase.transition,
    'hover:border-sf-button/30 hover:shadow-sm',
    'focus:scale-[1.01] focus:shadow-md focus:border-sf-button/50'
  ),
};

// Icon animation classes
export const iconAnimations = {
  // Hover effects
  scale: 'hover:scale-110',
  rotate: 'hover:rotate-12',
  bounce: 'hover:animate-bounce',
  
  // Transition effects
  slideRight: 'group-hover:translate-x-1',
  slideLeft: 'group-hover:-translate-x-1',
  slideUp: 'group-hover:-translate-y-1',
  
  // Combined icon animations
  subtle: cn(
    animationBase.transition,
    'hover:scale-110'
  ),
  
  arrow: cn(
    'transition-transform duration-200',
    'group-hover:translate-x-1'
  ),
  
  interactive: cn(
    animationBase.transitionFast,
    'hover:scale-110 active:scale-95'
  ),
};

// Loading animation classes
export const loadingAnimations = {
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  
  // Custom loading animations
  fadeIn: 'animate-in fade-in duration-300',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
};

// Stagger animation utilities for lists
export const staggerAnimations = {
  // CSS custom properties for stagger delays
  item1: '[animation-delay:0ms]',
  item2: '[animation-delay:100ms]',
  item3: '[animation-delay:200ms]',
  item4: '[animation-delay:300ms]',
  item5: '[animation-delay:400ms]',
  item6: '[animation-delay:500ms]',
};

// Reveal and collapse animation classes
export const revealAnimations = {
  // Fade animations
  fadeIn: 'animate-in fade-in duration-300 ease-out',
  fadeOut: 'animate-out fade-out duration-200 ease-in',
  
  // Scale animations
  scaleIn: 'animate-in zoom-in-95 duration-200 ease-out',
  scaleOut: 'animate-out zoom-out-95 duration-150 ease-in',
  
  // Slide animations
  slideDown: 'animate-in slide-in-from-top-2 duration-300 ease-out',
  slideUp: 'animate-out slide-out-to-top-2 duration-200 ease-in',
  
  // Combined reveal animations
  answerReveal: cn(
    'transition-all duration-200 ease-out',
    'animate-in fade-in zoom-in-95'
  ),
  
  answerHide: cn(
    'transition-all duration-150 ease-in',
    'animate-out fade-out zoom-out-95'
  ),
  
  // Collapsible content animations
  expandContent: cn(
    'transition-all duration-300 ease-out',
    'animate-in slide-in-from-top-2 fade-in'
  ),
  
  collapseContent: cn(
    'transition-all duration-200 ease-in',
    'animate-out slide-out-to-top-2 fade-out'
  ),
};

// Enhanced button animation classes with more subtle effects
export const enhancedButtonAnimations = {
  // Subtle hover effects
  subtleHover: cn(
    animationBase.transition,
    'hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-sm'
  ),
  
  // Primary button with glow
  primaryHover: cn(
    animationBase.transition,
    'hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-sf-button/20'
  ),
  
  // Ghost button with scale
  ghostHover: cn(
    animationBase.transition,
    'hover:scale-[1.02] hover:bg-sf-button/5'
  ),
  
  // Icon button with rotation
  iconHover: cn(
    animationBase.transitionFast,
    'hover:scale-110 hover:rotate-3'
  ),
  
  // Interactive element with bounce
  interactiveHover: cn(
    animationBase.transition,
    'hover:scale-105 active:scale-95'
  ),
};

// Animation presets for common components
export const animationPresets = {
  // Topic cards
  topicCard: cn(
    animationBase.transitionSlow,
    cardAnimations.hoverLift,
    cardAnimations.hoverScale,
    cardAnimations.hoverGlow,
    cardAnimations.hoverBorder,
    'cursor-pointer'
  ),
  
  // Question cards
  questionCard: cn(
    animationBase.transitionSlow,
    cardAnimations.hoverLift,
    'hover:scale-[1.01]',
    cardAnimations.hoverGlow,
    cardAnimations.hoverBorder,
    'cursor-pointer group'
  ),
  
  // Level selection cards
  levelCard: cn(
    animationBase.transitionSlow,
    'hover:-translate-y-2 hover:scale-[1.02]',
    cardAnimations.hoverGlow,
    cardAnimations.hoverBorder,
    'cursor-pointer group'
  ),
  
  // Navigation buttons
  navButton: cn(
    animationBase.transition,
    buttonAnimations.hoverLift,
    buttonAnimations.hoverScale,
    buttonAnimations.clickScale
  ),
  
  // Primary action buttons
  primaryButton: cn(
    animationBase.transition,
    buttonAnimations.hoverLift,
    'hover:shadow-lg hover:shadow-sf-button/10',
    buttonAnimations.clickScale
  ),
  
  // Search inputs
  searchInput: cn(
    animationBase.transition,
    inputAnimations.hover,
    inputAnimations.focus
  ),
  
  // Interactive icons
  interactiveIcon: cn(
    animationBase.transitionFast,
    iconAnimations.scale,
    'active:scale-95'
  ),
  
  // Enhanced presets for new components
  collapsibleCard: cn(
    animationBase.transitionSlow,
    'hover:border-sf-button/30 hover:shadow-sm'
  ),
  
  answerButton: cn(
    animationBase.transition,
    'hover:scale-105 active:scale-95',
    'focus:ring-2 focus:ring-sf-button focus:ring-offset-2'
  ),
  
  chevronIcon: cn(
    'transition-transform duration-200 ease-out'
  ),
};

// Utility function to combine animations with conditions
export const conditionalAnimation = (
  condition: boolean,
  trueAnimation: string,
  falseAnimation?: string
) => {
  return condition ? trueAnimation : (falseAnimation || '');
};

// Utility function to create staggered animations
export const createStaggerDelay = (index: number, baseDelay: number = 100) => {
  return `[animation-delay:${index * baseDelay}ms]`;
};

// Animation variants for different interaction states
export const interactionStates = {
  idle: '',
  hover: 'hover:',
  focus: 'focus:',
  active: 'active:',
  disabled: 'disabled:',
  groupHover: 'group-hover:',
  groupFocus: 'group-focus:',
};

// Export all animation utilities as a single object
export const animations = {
  base: animationBase,
  button: buttonAnimations,
  enhancedButton: enhancedButtonAnimations,
  card: cardAnimations,
  input: inputAnimations,
  icon: iconAnimations,
  loading: loadingAnimations,
  stagger: staggerAnimations,
  reveal: revealAnimations,
  presets: animationPresets,
  conditional: conditionalAnimation,
  staggerDelay: createStaggerDelay,
  states: interactionStates,
};

export default animations;