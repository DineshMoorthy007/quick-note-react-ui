import React from 'react';
import type { ChangeEvent } from 'react';

/**
 * Props for the TextArea component.
 * @param placeholder - Placeholder text.
 * @param value - Current value.
 * @param onChange - Change handler.
 * @param rows - Number of visible text lines.
 * @param className - Additional Tailwind CSS classes.
 * @param id - Unique identifier.
 */
export interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
  id?: string;
}

/**
 * A flexible textarea component styled with Tailwind CSS.
 * Optimized for note content entry with vertical resizing support.
 */
export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  rows = 5,
  className = "",
  id,
}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3.5 py-2.5 border-1.5 border-gray-200 rounded-lg text-sm outline-none transition-colors 
        bg-gray-50 focus:border-violet-400 focus:bg-white text-gray-800 placeholder:text-gray-400 font-sans 
        resize-vertical leading-relaxed ${className}`}
    />
  );
};
