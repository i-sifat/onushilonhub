'use client';

import { useState } from 'react';
import { Check, ChevronDown, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Level {
  id: 'hsc' | 'ssc';
  name: string;
  description: string;
}

interface LevelSelectorProps {
  selectedLevel?: 'hsc' | 'ssc';
  onLevelSelect: (level: 'hsc' | 'ssc') => void;
  placeholder?: string;
  className?: string;
}

const LEVELS: Level[] = [
  {
    id: 'hsc',
    name: 'HSC',
    description: 'Higher Secondary Certificate'
  },
  {
    id: 'ssc',
    name: 'SSC',
    description: 'Secondary School Certificate'
  }
];

export default function LevelSelector({
  selectedLevel,
  onLevelSelect,
  placeholder = 'Select level',
  className = ''
}: LevelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLevelData = LEVELS.find(level => level.id === selectedLevel);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${className}`}
        >
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span className="truncate">
              {selectedLevelData ? selectedLevelData.name : placeholder}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[250px]">
        {LEVELS.map((level) => (
          <DropdownMenuItem
            key={level.id}
            onClick={() => {
              onLevelSelect(level.id);
              setIsOpen(false);
            }}
            className="flex items-center justify-between cursor-pointer p-3"
          >
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-4 w-4 text-sf-button" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{level.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {level.id.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-sf-text-muted">
                  {level.description}
                </p>
              </div>
            </div>
            {selectedLevel === level.id && (
              <Check className="h-4 w-4 text-sf-button" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}