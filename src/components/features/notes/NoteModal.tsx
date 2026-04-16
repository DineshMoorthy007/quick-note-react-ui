import React, { useState } from 'react';
import type { Note } from '../../../types/note';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { TextArea } from '../../ui/TextArea';
import { CloseIcon } from '../../ui/Icons';

/**
 * Props for the NoteModal feature component.
 */
export interface NoteModalProps {
  onClose: () => void;
  onSave: (title: string, content: string) => Promise<void>;
  initial?: Note;
}

/**
 * A modal dialog for creating or editing notes.
 * Manages local form state and provides validation feedback.
 * Styled with Tailwind transitions and a semi-transparent backdrop.
 */
export const NoteModal: React.FC<NoteModalProps> = ({ onClose, onSave, initial }) => {
  const isEditing = !!initial;
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      setError("A title is required for your note.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await onSave(title.trim(), content.trim());
      onClose();
    } catch (e: any) {
      setError(e.message || "Something went wrong while saving.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[500] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-xl border border-slate-100 p-8 pt-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {isEditing ? "Edit Note" : "Create New Note"}
          </h3>
          <Button variant="icon" onClick={onClose} title="Close modal">
            <CloseIcon className="w-5 h-5" />
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs py-2.5 px-3 rounded-lg border border-red-100 mb-5 font-medium">
            {error}
          </div>
        )}

        {/* Form Body */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700 ml-0.5" htmlFor="note-title">Title</label>
            <Input 
              id="note-title"
              placeholder="Give your note a title..." 
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              className="!py-3 font-semibold text-base"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700 ml-0.5" htmlFor="note-content">Note Content</label>
            <TextArea 
              id="note-content"
              placeholder="Start typing your thoughts..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-50">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              isLoading={isLoading}
              className="px-8"
            >
              {isEditing ? "Update Note" : "Add Note"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
