import React from 'react';
import { Button } from '../../ui/Button';
import { PlusIcon } from '../../ui/Icons';

/**
 * Props for the Toolbar component.
 * @param noteCount - Total number of notes currently displayed.
 * @param onNewNote - Callback to trigger the creation of a new note.
 */
export interface ToolbarProps {
  noteCount: number;
  onNewNote: () => void;
}

/**
 * Secondary navigation and action bar for the dashboard.
 * Displays summary metadata and provides access to primary actions like creating notes.
 */
export const Toolbar: React.FC<ToolbarProps> = ({ noteCount, onNewNote }) => {
  return (
    <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
      <div>
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">My Board</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">
          {noteCount} note{noteCount !== 1 ? 's' : ''} captured
        </p>
      </div>

      <Button 
        onClick={onNewNote}
        className="gap-2 !py-2.5 !px-5"
      >
        <PlusIcon className="w-5 h-5" />
        <span className="font-bold tracking-tight">New Note</span>
      </Button>
    </div>
  );
};
