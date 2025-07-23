'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchInput({ 
  placeholder = "Search questions...", 
  value, 
  onChange,
  className = ""
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-sf-text-muted" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-3 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle placeholder-sf-text-muted focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent transition-all duration-200 ease-out hover:border-sf-button/30 hover:shadow-sm focus:shadow-md focus:scale-[1.01]"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sf-text-muted hover:text-sf-button hover:scale-110 transition-all duration-200 ease-out active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}