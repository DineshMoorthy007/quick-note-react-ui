import { useState } from 'react';
import type { AuthState } from './types/note';
import { AuthScreen } from './components/features/auth/AuthScreen';
import { Dashboard } from './components/features/dashboard/Dashboard';

/**
 * Root Application Component.
 * Manages the global authentication state and performs conditional rendering
 * between the Auth flow and the main Dashboard.
 */
export default function App() {
  /**
   * Initializes auth state from localStorage to persist sessions across reloads.
   */
  const [auth, setAuth] = useState<AuthState | null>(() => {
    try {
      const token = localStorage.getItem("qnp_token");
      const email = localStorage.getItem("qnp_email");
      return token ? { token, email: email || "" } : null;
    } catch {
      return null;
    }
  });

  /**
   * Persists authentication data and updates application state.
   */
  const handleLogin = (token: string, email: string) => {
    try {
      localStorage.setItem("qnp_token", token);
      localStorage.setItem("qnp_email", email);
    } catch (e) {
      console.error("Failed to persist auth data", e);
    }
    setAuth({ token, email });
  };

  /**
   * Clears authentication data and returns user to the login screen.
   */
  const handleLogout = () => {
    try {
      localStorage.removeItem("qnp_token");
      localStorage.removeItem("qnp_email");
    } catch (e) {
      console.error("Failed to clear auth data", e);
    }
    setAuth(null);
  };

  // Conditional rendering based on presence of a valid auth token
  return auth ? (
    <Dashboard 
      token={auth.token} 
      email={auth.email} 
      onLogout={handleLogout} 
    />
  ) : (
    <AuthScreen onLogin={handleLogin} />
  );
}
