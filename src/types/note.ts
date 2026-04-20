/**
 * Domain types for the Note application.
 * Defines the contract for Note entities and related state.
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
}

export interface AuthState {
  token: string;
  username: string;
}
