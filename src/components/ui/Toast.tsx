import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

/**
 * Props for the Toast notification component.
 * @param message - The text content to display.
 * @param type - Determines the color theme of the notification.
 * @param onClose - Callback invoked after expiration or manual dismissal.
 */
export interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

/**
 * A self-dismissing notification component.
 * Positioned globally (fixed) and styled with Tailwind CSS to match the app theme.
 */
export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const themes = {
    success: "bg-green-50 text-green-700 border-green-200",
    error: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-lg font-medium text-sm
      shadow-lg border flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 ${themes[type]}`}>
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-1 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <CloseIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
