
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: string, pass: string) => {
    // Hardcoded credentials for the demo. 
    // In production, this would hit an API.
    if (user === 'admin' && pass === 'memento2025') {
      sessionStorage.setItem('admin_session', 'active');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_session');
    setIsAuthenticated(false);
    // Force redirect if needed handled by consumer
    window.location.href = '/';
  };

  return { isAuthenticated, login, logout };
};
