import React from 'react';

/**
 * Props for the Button component.
 * @param variant - Visual style variant of the button.
 * @param children - Button label or icon content.
 * @param onClick - Click handler.
 * @param disabled - Whether the button is disabled.
 * @param className - Additional Tailwind CSS classes for custom styling.
 * @param isLoading - Whether the button should show a loading state (prevents clicks).
 * @param type - HTML button type attribute.
 * @param title - Accessibility title for the button.
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon' | 'ghost';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

/**
 * A reusable Button component with multiple style variants and Tailwind CSS support.
 * Adheres to the modular design system of the Quick-Note application.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = '',
  isLoading = false,
  type = 'button',
  title,
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm active:scale-[0.98]",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-[9px] px-[18px] rounded-lg active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-500 font-medium py-2 px-4 rounded-lg",
    icon: "bg-transparent p-1.5 rounded-md hover:bg-gray-100 text-gray-400 active:scale-90",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClasses}
      title={title}
    >
      {isLoading ? "..." : children}
    </button>
  );
};
