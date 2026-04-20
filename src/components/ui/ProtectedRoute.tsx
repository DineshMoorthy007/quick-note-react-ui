/**
 * ProtectedRoute component ensures that only authenticated users can access wrapped content.
 * It checks for the presence of a token (or userId) in localStorage. If absent, it redirects
 * to the login page. This mirrors typical private route patterns in React Router.
 */
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  /**
   * Child elements (typically a page component) that require authentication.
   */
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('qnp_token');
  const userId = localStorage.getItem('qnp_userId'); // optional if used elsewhere

  // If no token or userId, redirect to login
  if (!token && !userId) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the protected content
  return <>{children}</>;
}
