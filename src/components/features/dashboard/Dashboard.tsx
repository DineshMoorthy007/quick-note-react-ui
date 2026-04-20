import React, { useState, useEffect, useCallback } from 'react';
import type { Note } from '../../../types/note';
import { api } from '../../../services/api';

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
  username: string;
  onLogout: () => void;
}

/**
 * The primary layout and state container for the authenticated view.
 * Coordinates note management, search, and UI state (modals/toasts).
 */
export const Dashboard: React.FC<DashboardProps> = ({ token, username, onLogout }) => {
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load notes";
      showToast(msg, "error");
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
      showToast("Note successfully created!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create note";
      showToast(msg, "error");
    }
  };

  const handleUpdate = async (title: string, content: string) => {
    if (!editingNote) return;
    try {
      await api.updateNote(token, editingNote.id, title, content);
      setNotes(prev => prev.map(n => n.id === editingNote.id ? { ...n, title, content } : n));
      setEditingNote(null);
      showToast("Note updated correctly.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update note";
      showToast(msg, "error");
    }
  };

  const handlePin = async (id: string, isPinned: boolean) => {
    try {
      await api.pinNote(token, id, isPinned);
      setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned } : n));
      showToast(isPinned ? "Note pinned to top" : "Note unpinned");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to pin note";
      showToast(msg, "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteNote(token, id);
      setNotes(prev => prev.filter(n => n.id !== id));
      showToast("Note deleted.", "error");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete note";
      showToast(msg, "error");
    }
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
        username={username} 
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
