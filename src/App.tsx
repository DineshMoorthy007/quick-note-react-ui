import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { AuthState } from './types/note';
import { AuthScreen } from './components/features/auth/AuthScreen';
import { Dashboard } from './components/features/dashboard/Dashboard';
import ProtectedRoute from './components/ui/ProtectedRoute.tsx';

/**
 * Root Application Component.
 * Manages the global authentication state and routing.
 */
export default function App() {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    try {
      const token = localStorage.getItem("qnp_token");
      const username = localStorage.getItem("qnp_username");
      return token ? { token, username: username || "" } : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (token: string, username: string) => {
    try {
      localStorage.setItem("qnp_token", token);
      localStorage.setItem("qnp_username", username);
    } catch (e) {
      console.error("Failed to persist auth data", e);
    }
    setAuth({ token, username });
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("qnp_token");
      localStorage.removeItem("qnp_username");
    } catch (e) {
      console.error("Failed to clear auth data", e);
    }
    setAuth(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!auth ? <AuthScreen onLogin={handleLogin} /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard 
                token={auth?.token ?? ''} 
                username={auth?.username ?? ''} 
                onLogout={handleLogout} 
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
