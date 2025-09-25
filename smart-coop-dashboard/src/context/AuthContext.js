import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    role: null, // 'admin' or 'farmer'
    name: '',
    farmName: ''
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('smartCoopAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(authData.isAuthenticated);
        setUser(authData.user);
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('smartCoopAuth');
      }
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      const authData = { isAuthenticated, user };
      localStorage.setItem('smartCoopAuth', JSON.stringify(authData));
    } else {
      localStorage.removeItem('smartCoopAuth');
    }
  }, [isAuthenticated, user]);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setUser({
        role: 'admin',
        name: 'Admin User',
        farmName: ''
      });
      setIsAuthenticated(true);
      return true;
    } else if (username === 'farmer' && password === 'farmer123') {
      setUser({
        role: 'farmer',
        name: 'John Smith',
        farmName: 'Green Valley Farm'
      });
      setIsAuthenticated(true);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({
      role: null,
      name: '',
      farmName: ''
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};