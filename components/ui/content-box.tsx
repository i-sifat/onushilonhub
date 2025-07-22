'use client';

import { cn } from '@/lib/utils';

interface ContentBoxProps {
  type: 'structure' | 'example' | 'tip';
  title?: string;
  content: string | string[];
  className?: string;
  showIcon?: boolean;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  type,
  title,
  content,
  className,
  showIcon = true
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'structure':
        return {
          icon: '🏗️',
          defaultTitle: 'Structure',
          borderColor: 'border-sf-button',
          bgColor: 'bg-sf-button/5',
          hoverBorderColor: 'hover:border-sf-button/50'
        };
      case 'example':
        return {
          icon: '💡',
          defaultTitle: 'Example',
          borderColor: 'border-sf-highlight',
          bgColor: 'bg-sf-highlight/5',
          hoverBorderColor: 'hover:border-sf-highlight/50'
        };
      case 'tip':
        return {
          icon: '💡',
          defaultTitle: 'Tip',
          borderColor: 'border-blue-500',
          bgColor: 'bg-blue-500/5',
          hoverBorderColor: 'hover:border-blue-500/50'
        };
      default:
        return {
          icon: '📝',
          defaultTitle: 'Content',
          borderColor: 'border-sf-text-muted/30',
          bgColor: 'bg-neutral-800/30',
          hoverBorderColor: 'hover:border-sf-text-muted/50'
        };
    }
  };

  const config = getTypeConfig();
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={cn(
      "rounded-2xl border transition-all duration-300",
      "backdrop-blur-sm",
      config.borderColor,
      config.bgColor,
      config.hoverBorderColor,
      "hover:shadow-lg hover:shadow-black/5",
      className
    )}>
      {/* Header with title and icon */}
      {(showIcon || title) && (
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-lg font-semibold text-sf-text-bold flex items-center gap-2">
            {showIcon && <span className="text-xl">{config.icon}</span>}
            {displayTitle}
          </h3>
        </div>
      )}
      
      {/* Content */}
      <div className={cn(
        "px-6",
        (showIcon || title) ? "pb-6" : "py-6"
      )}>
        <div className="space-y-3">
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <div key={index} className={cn(
                "text-sf-text-subtle text-sm leading-relaxed",
                type === 'structure' && "font-mono"
              )}>
                {item}
              </div>
            ))
          ) : (
            <div className={cn(
              "text-sf-text-subtle text-sm leading-relaxed",
              type === 'structure' && "font-mono"
            )}>
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ContentBox };
export type { ContentBoxProps };