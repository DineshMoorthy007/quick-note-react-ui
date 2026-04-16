import React, { useState, useEffect, useCallback } from 'react';
import type { Note } from '../../../types/note';
import { api } from '../../../services/api';
import { genId } from '../../../utils/formatters';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { NoteGrid } from '../notes/NoteGrid';
import { NoteModal } from '../notes/NoteModal';
import { Toast } from '../../ui/Toast';

/**
 * Props for the Dashboard component.
 */
export interface DashboardProps {
  token: string;
  email: string;
  onLogout: () => void;
}

/**
 * The primary layout and state container for the authenticated view.
 * Coordinates note management, search, and UI state (modals/toasts).
 */
export const Dashboard: React.FC<DashboardProps> = ({ token, email, onLogout }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [search, setSearch] = useState("");

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
  };

  /**
   * Fetches the latest notes from the API.
   * Includes fallback logic for preview if the API is unavailable.
   */
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getNotes(token);
      setNotes(data);
    } catch {
      // Fallback behavior from original ClaudePrototype
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = async (title: string, content: string) => {
    try {
      await api.createNote(token, title, content);
      await fetchNotes();
    } catch {
      // Optimistic local add for mock/preview purposes
      const newNote: Note = {
        id: genId(),
        title,
        content,
        isPinned: false,
        createdAt: new Date().toISOString()
      };
      setNotes(prev => [newNote, ...prev]);
    }
    showToast("Note successfully created!");
  };

  const handleUpdate = async (title: string, content: string) => {
    if (!editingNote) return;
    try {
      await api.updateNote(token, editingNote.id, title, content);
    } catch {
      // Update locally if API fails in preview
    }
    setNotes(prev => prev.map(n => n.id === editingNote.id ? { ...n, title, content } : n));
    setEditingNote(null);
    showToast("Note updated correctly.");
  };

  const handlePin = async (id: string, isPinned: boolean) => {
    try {
      await api.pinNote(token, id, isPinned);
    } catch {}
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned } : n));
    showToast(isPinned ? "Note pinned to top" : "Note unpinned");
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteNote(token, id);
    } catch {}
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast("Note deleted.", "error");
  };

  // Logic for filtering and sorting notes (pinned items first)
  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );
  
  const sortedNotes = [...filtered].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Header 
        email={email} 
        onLogout={onLogout} 
        search={search} 
        onSearchChange={setSearch} 
      />

      <main className="max-w-[1000px] mx-auto px-5 py-10 pb-20">
        <Toolbar 
          noteCount={notes.length} 
          onNewNote={() => setShowCreateModal(true)} 
        />

        <NoteGrid 
          notes={sortedNotes}
          isLoading={loading}
          onPin={handlePin}
          onDelete={handleDelete}
          onEdit={setEditingNote}
          hasFilter={!!search}
        />
      </main>

      {/* Conditional Modals */}
      {showCreateModal && (
        <NoteModal 
          onClose={() => setShowCreateModal(false)} 
          onSave={handleCreate} 
        />
      )}

      {editingNote && (
        <NoteModal 
          onClose={() => setEditingNote(null)} 
          onSave={handleUpdate} 
          initial={editingNote} 
        />
      )}

      {/* Global Notifications */}
      {toast && (
        <Toast 
          message={toast.msg} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};
