'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Topic {
  id: string;
  name: string;
  available: boolean;
}

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopic?: string;
  onTopicSelect: (topicId: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TopicSelector({
  topics,
  selectedTopic,
  onTopicSelect,
  placeholder = 'Select a topic',
  className = ''
}: TopicSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedTopicData = topics.find(topic => topic.id === selectedTopic);
  const availableTopics = topics.filter(topic => topic.available);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${className}`}
        >
          <span className="truncate">
            {selectedTopicData ? selectedTopicData.name : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[200px]">
        {availableTopics.length === 0 ? (
          <DropdownMenuItem disabled>
            No topics available
          </DropdownMenuItem>
        ) : (
          availableTopics.map((topic) => (
            <DropdownMenuItem
              key={topic.id}
              onClick={() => {
                onTopicSelect(topic.id);
                setIsOpen(false);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="truncate">{topic.name}</span>
              {selectedTopic === topic.id && (
                <Check className="h-4 w-4 text-sf-button" />
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}