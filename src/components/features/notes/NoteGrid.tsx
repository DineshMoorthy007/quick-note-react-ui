import React from 'react';
import type { Note } from '../../../types/note';
import { NoteCard } from './NoteCard';
import { Spinner } from '../../ui/Spinner';

/**
 * Props for the NoteGrid component.
 */
export interface NoteGridProps {
  notes: Note[];
  onPin: (id: string, pinned: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (note: Note) => void;
  isLoading: boolean;
  hasFilter?: boolean;
}

/**
 * A responsive grid component for displaying notes in a masonry-style layout.
 * Handles loading states and provides informative empty states for search or empty boards.
 */
export const NoteGrid: React.FC<NoteGridProps> = ({ 
  notes, 
  onPin, 
  onDelete, 
  onEdit, 
  isLoading,
  hasFilter = false 
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="text-5xl mb-6 grayscale opacity-80">📋</div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {hasFilter ? "No matches found" : "Your board is empty"}
        </h3>
        <p className="text-sm text-slate-400 max-w-[280px]">
          {hasFilter 
            ? "Try adjusting your search query to find what you're looking for." 
            : "Capture your first thought by clicking the 'New Note' button above."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
      {notes.map(note => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onPin={onPin} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};
