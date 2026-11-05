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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('findmystuff_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (!parsedUser || typeof parsedUser !== 'object' || Array.isArray(parsedUser)) {
          throw new Error('Stored user data must be an object.');
        }
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('findmystuff_user');
        console.error('Unable to restore saved user; invalid session data has been cleared.', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('findmystuff_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('findmystuff_user');
  };

  const signup = (userData) => {
    setUser(userData);
    localStorage.setItem('findmystuff_user', JSON.stringify(userData));
  };

  const value = {
    user,
    login,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
