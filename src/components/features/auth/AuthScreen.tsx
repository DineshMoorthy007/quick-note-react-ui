import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { api } from '../../../services/api';

/**
 * Props for the AuthForm feature component.
 * @param onLogin - Callback for successful authentication.
 */
export interface AuthScreenProps {
  onLogin: (token: string, username: string) => void;
}

/**
 * Main authentication screen providing Login and Registration flows.
 * Manages form state, modal switching, and integration with the API service.
 */
export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (mode === 'register') {
        await api.register(username, password);
      }
      const data = await api.login(username, password);

      if (!data.token) {
        throw new Error("Authentication succeeded but no token was returned.");
      }

      onLogin(data.token, username);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-[400px] shadow-sm border border-slate-100">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative pointer-events-none">
            <div className="w-9 h-9 bg-violet-50 rounded-lg" />
            <div className="absolute inset-x-2 inset-y-1.5 bg-violet-200 rounded-sm" />
            <div className="absolute top-1/2 left-3 w-2.5 h-[1.5px] bg-violet-600 rounded-full" />
            <div className="absolute top-[60%] left-3 w-2 h-[1.5px] bg-violet-600 rounded-full" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-violet-600 rounded-full border-2 border-white" />
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">Quick-Note</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1.5">
          {mode === 'login' ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-sm text-slate-500 mb-7">
          {mode === 'login' ? "Sign in to your pinboard." : "Start pinning your notes."}
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs py-2.5 px-3 rounded-lg border border-red-100 mb-5 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700 ml-0.5" htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700 ml-0.5" htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <Button
            className="w-full mt-2"
            onClick={handleSubmit}
            isLoading={loading}
          >
            {mode === 'login' ? "Sign In" : "Create Account"}
          </Button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(""); }}
            className="text-violet-600 font-bold hover:underline"
          >
            {mode === 'login' ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};
