import React from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

/**
 * Props for the Input component.
 * @param placeholder - Input placeholder text.
 * @param value - Current value.
 * @param onChange - Change handler.
 * @param onKeyDown - Key down handler (e.g., for Enter key registration).
 * @param type - HTML input type (e.g., 'text', 'password', 'email').
 * @param autoFocus - Whether the input should auto-focus on mount.
 * @param className - Additional Tailwind CSS classes.
 * @param id - Unique identifier for the input.
 */
export interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  autoFocus?: boolean;
  className?: string;
  id?: string;
}

/**
 * A standardized input component with Tailwind utility styling.
 * Supports essential form interaction while maintaining a consistent visual theme.
 */
export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
  type = "text",
  autoFocus,
  className = "",
  id,
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      className={`w-full px-3.5 py-2.5 border-1.5 border-gray-200 rounded-lg text-sm outline-none transition-colors 
        bg-gray-50 focus:border-violet-400 focus:bg-white text-gray-800 placeholder:text-gray-400 font-sans ${className}`}
    />
  );
};
