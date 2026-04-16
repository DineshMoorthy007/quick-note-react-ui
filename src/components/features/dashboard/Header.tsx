import React from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { LogoutIcon } from '../../ui/Icons';

/**
 * Props for the Header component.
 * @param email - The current user's email address.
 * @param onLogout - Callback to sign out the user.
 * @param search - Current search query value.
 * @param onSearchChange - Callback invoked when the search input changes.
 */
export interface HeaderProps {
  email: string;
  onLogout: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

/**
 * Global application header containing branding, search functionality, and user controls.
 * Styled with Tailwind CSS to be sticky at the top of the dashboard.
 */
export const Header: React.FC<HeaderProps> = ({ email, onLogout, search, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-[100] h-16 flex items-center">
      <div className="max-w-[1000px] w-full mx-auto px-5 flex items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2.5 flex-none cursor-default">
            <div className="relative scale-90 pointer-events-none">
             <div className="w-8 h-8 bg-violet-50 rounded-lg" />
             <div className="absolute inset-x-1.5 inset-y-1 bg-violet-200 rounded-sm" />
             <div className="absolute top-1/2 left-2 w-2 h-[1px] bg-violet-600 rounded-full" />
             <div className="absolute top-[60%] left-2 w-1.5 h-[1px] bg-violet-600 rounded-full" />
             <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-violet-600 rounded-full border border-white" />
           </div>
          <span className="font-bold text-gray-900 tracking-tight hidden sm:inline">Quick-Note</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[400px]">
          <Input 
            placeholder="Search your notes..." 
            value={search} 
            onChange={e => onSearchChange(e.target.value)}
            className="!py-[7px] !px-4 text-[13px] bg-gray-50/50 border-transparent focus:border-violet-300"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 flex-none">
          <span className="text-sm font-medium text-gray-500 hidden md:inline">
            {email}
          </span>
          <Button 
             variant="icon" 
             onClick={onLogout} 
             title="Sign out"
             className="text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <LogoutIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
