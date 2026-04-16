import React from 'react';

/**
 * A standard loading spinner component using Tailwind animation classes.
 * Center-aligned by default to provide visual feedback during asynchronous operations.
 */
export const Spinner: React.FC = () => (
  <div className="flex items-center justify-center py-10">
    <div 
      className="w-9 h-9 border-[3px] border-gray-200 border-t-violet-500 rounded-full animate-spin"
      role="status"
      aria-label="loading"
    />
  </div>
);
