/**
 * API Service layer for interacting with the backend.
 * Uses VITE_API_BASE_URL for the base endpoint.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

interface RequestOptions extends RequestInit {
  body?: string;
}

/**
 * Service providing methods for authentication and note management.
 */
export const api = {
  /**
   * Generates standard headers including Bearer token if available.
   */
  headers: (token: string | null) => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }),

  /**
   * Generic request wrapper with error handling.
   */
  async request(path: string, options: RequestOptions = {}, token: string | null = null) {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: this.headers(token),
      });

      if (!res.ok) {
        let errorMessage = "Request failed";
        try {
          const err = await res.json();
          errorMessage = err.message || errorMessage;
        } catch {
          // If not JSON, use status text
          errorMessage = res.statusText || `Error ${res.status}`;
        }
        throw new Error(errorMessage);
      }

      return res.json();
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Network error or unexpected failure");
    }
  },

  register: (username: string, pass: string) =>
    api.request("/api/auth/register", { method: "POST", body: JSON.stringify({ username, password: pass }) }),

  login: (username: string, pass: string) =>
    api.request("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password: pass }) }),

  getNotes: (token: string) => 
    api.request("/api/notes", {}, token),

  createNote: (token: string, title: string, content: string) =>
    api.request("/api/notes", { method: "POST", body: JSON.stringify({ title, content }) }, token),

  updateNote: (token: string, id: string, title: string, content: string) =>
    api.request(`/api/notes/${id}`, { method: "PUT", body: JSON.stringify({ title, content }) }, token),

  pinNote: (token: string, id: string, isPinned: boolean) =>
    api.request(`/api/notes/${id}/pin`, { method: "PUT", body: JSON.stringify({ isPinned }) }, token),

  deleteNote: (token: string, id: string) =>
    api.request(`/api/notes/${id}`, { method: "DELETE" }, token),
};
