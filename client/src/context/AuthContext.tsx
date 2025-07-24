// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  username: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('User');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('User', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('User');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
