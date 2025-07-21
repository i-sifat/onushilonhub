import { SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

/**
 * Reusable Icon component for consistent icon usage throughout the application.
 * 
 * @param name - Icon name including directory (e.g., 'topics/completing-sentence', 'ui/search')
 * @param size - Predefined size or custom number
 * @param className - Additional CSS classes
 * @param props - Additional SVG props
 */
export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const iconSize = typeof size === 'number' ? size : iconSizes[size];
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      className={cn('inline-block', className)}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <use href={`/icons/${name}.svg#icon`} />
    </svg>
  );
}

/**
 * Icon component specifically for topic icons with consistent styling
 */
export function TopicIcon({ topic, size = 'md', className, ...props }: Omit<IconProps, 'name'> & { topic: string }) {
  return (
    <Icon
      name={`topics/${topic}`}
      size={size}
      className={cn('text-primary', className)}
      {...props}
    />
  );
}

/**
 * Icon component for UI elements with consistent styling
 */
export function UIIcon({ icon, size = 'md', className, ...props }: Omit<IconProps, 'name'> & { icon: string }) {
  return (
    <Icon
      name={`ui/${icon}`}
      size={size}
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
}

/**
 * Icon component for action buttons with consistent styling
 */
export function ActionIcon({ action, size = 'md', className, ...props }: Omit<IconProps, 'name'> & { action: string }) {
  return (
    <Icon
      name={`actions/${action}`}
      size={size}
      className={cn('text-foreground', className)}
      {...props}
    />
  );
}