import React, { useState } from 'react';
import type { Note } from '../../../types/note';
import { fmtDate } from '../../../utils/formatters';
import { Button } from '../../ui/Button';
import { PinIcon, TrashIcon, EditIcon } from '../../ui/Icons';

/**
 * Props for the NoteCard feature component.
 */
export interface NoteCardProps {
  note: Note;
  onPin: (id: string, isPinned: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (note: Note) => void;
}

/**
 * Individual note display component with interactive controls for pinning, editing, and deletion.
 * Implements an elevated visual state for pinned entries and responsive layouts.
 */
export const NoteCard: React.FC<NoteCardProps> = ({ note, onPin, onDelete, onEdit }) => {
  const [isPinning, setIsPinning] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePin = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinning(true);
    await onPin(note.id, !note.isPinned);
    setIsPinning(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete(note.id);
    setIsDeleting(false);
  };

  const isPinned = note.isPinned;

  return (
    <div 
      className={`group relative bg-white rounded-xl p-5 mb-4 break-inside-avoid transition-all duration-200 border
        ${isPinned 
          ? 'border-violet-500 shadow-[0_4px_20px_rgba(124,58,237,0.08)]' 
          : 'border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
        }`}
    >
      {isPinned && (
        <div className="absolute -top-px right-4 bg-violet-600 text-[9px] font-black text-white px-2.5 py-1 rounded-b-md tracking-widest uppercase">
          Pinned
        </div>
      )}

      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug pr-2">
        {note.title}
      </h3>
      
      <p className="text-[13.5px] text-gray-600 leading-relaxed mb-5 whitespace-pre-wrap">
        {note.content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <span className="text-[11px] font-medium text-gray-400">
          {fmtDate(note.createdAt)}
        </span>

        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="icon"
            onClick={handlePin}
            disabled={isPinning}
            title={isPinned ? "Unpin note" : "Pin note"}
            className={`!p-1.5 ${isPinned ? 'text-violet-600 bg-violet-50' : 'text-gray-400'}`}
          >
            <PinIcon filled={isPinned} className="w-4 h-4" />
          </Button>

          <Button
            variant="icon"
            onClick={() => onEdit(note)}
            title="Edit note"
            className="!p-1.5 text-gray-400"
          >
            <EditIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete note"
            className="!p-1.5 text-red-400 hover:bg-red-50"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
