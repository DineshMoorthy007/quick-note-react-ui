import React from 'react';

/**
 * Interface for icon component props.
 * @param className - Optional CSS classes for styling (e.g., size, color).
 * @param filled - Whether the icon should use a filled variant (used for the Pin icon).
 */
export interface IconProps {
  className?: string;
  filled?: boolean;
}

/**
 * Standard pin icon for marking important notes.
 */
export const PinIcon: React.FC<IconProps> = ({ className = "w-4 h-4", filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={`${className} pointer-events-none`}>
    <path d="M12 2l3 7h5l-4 4 2 7-6-4-6 4 2-7-4-4h5z" />
  </svg>
);

/**
 * Trash/Delete icon for removing notes.
 */
export const TrashIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} pointer-events-none`}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

/**
 * Plus icon for "New Note" actions.
 */
export const PlusIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} pointer-events-none`}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * Close/X icon for modals and toast dismissal.
 */
export const CloseIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} pointer-events-none`}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Edit/Pencil icon for modifying existing notes.
 */
export const EditIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} pointer-events-none`}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

/**
 * Logout icon for user sign-out action.
 */
export const LogoutIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} pointer-events-none`}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
