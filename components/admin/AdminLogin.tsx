
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LotusIcon } from '../Icons';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Access Denied. The gate remains closed.');
    } else {
      // Reload to trigger auth state update in main app or just handle it via context if we were using one.
      // Since useAuth uses sessionStorage, a re-render of parent is needed or a refresh.
      // For this simple structure, reloading is the easiest way to reset app state to Admin View.
      window.location.reload(); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] p-6">
      <div className="max-w-md w-full space-y-12 text-center">
        <LotusIcon className="w-12 h-12 text-[var(--text-main)] mx-auto" />
        <h2 className="text-xl font-serif text-[var(--text-main)] tracking-widest uppercase">Restricted Access</h2>
        
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Identity" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-center font-serif text-[var(--text-main)] focus:outline-none focus:border-[var(--border-strong)] placeholder-[var(--text-faint)]"
            />
            <input 
              type="password" 
              placeholder="Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[var(--border-main)] py-3 text-center font-serif text-[var(--text-main)] focus:outline-none focus:border-[var(--border-strong)] placeholder-[var(--text-faint)]"
            />
          </div>

          {error && <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]">{error}</p>}

          <div className="flex justify-center gap-8">
            <button 
              type="button"
              onClick={() => window.location.href = '/'}
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] uppercase text-[10px] tracking-[0.2em]"
            >
              Return
            </button>
            <button 
              type="submit"
              className="text-[var(--text-main)] border border-[var(--border-strong)] px-8 py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)]"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
