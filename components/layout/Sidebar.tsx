'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  ChevronDown, 
  ChevronRight,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Get Started',
    href: '/get-started',
    icon: Home,
    children: [
      { title: 'HSC', href: '/get-started/hsc', icon: GraduationCap },
      { title: 'SSC', href: '/get-started/ssc', icon: GraduationCap },
      { title: 'Preposition', href: '/get-started/preposition', icon: BookOpen },
      { title: 'Modifier', href: '/get-started/modifier', icon: BookOpen },
      { title: 'Connectors', href: '/get-started/connectors', icon: BookOpen },
      { title: 'Completing Sentence', href: '/get-started/completing-sentence', icon: BookOpen },
    ]
  },
  {
    title: 'Grammar Items',
    href: '/grammar-items',
    icon: BookOpen,
    children: [
      { title: 'HSC', href: '/grammar-items/hsc', icon: GraduationCap },
      { title: 'SSC', href: '/grammar-items/ssc', icon: GraduationCap },
    ]
  },
  {
    title: 'Board Questions',
    href: '/board-questions',
    icon: FileText,
    children: [
      { title: 'HSC', href: '/board-questions/hsc', icon: GraduationCap },
      { title: 'SSC', href: '/board-questions/ssc', icon: GraduationCap },
    ]
  }
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isExpanded = (title: string) => {
    return expandedItems.includes(title) || 
           sidebarItems.find(item => item.title === title)?.children?.some(child => 
             child.href && isActive(child.href)
           );
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.title);
    const active = item.href ? isActive(item.href) : false;

    return (
      <div key={item.title} className="mb-1">
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
            level === 0 ? "text-sf-text-bold" : "text-sf-text-subtle ml-4",
            active && "bg-sf-button/10 text-sf-button",
            !active && "hover:bg-sf-text-muted/10 hover:text-sf-text-bold"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.title);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <item.icon className="h-4 w-4" />
            {item.href ? (
              <Link href={item.href} className="flex-1">
                {item.title}
              </Link>
            ) : (
              <span className="flex-1">{item.title}</span>
            )}
          </div>
          {hasChildren && (
            <div className="ml-2">
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </div>
        
        {hasChildren && expanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-64 bg-sf-bg border-r border-sf-text-muted/20 h-full", className)}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-sf-text-bold mb-4">Learning Hub</h2>
        <nav className="space-y-1">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </nav>
      </div>
    </div>
  );
}