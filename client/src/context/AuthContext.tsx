// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  username: string;
  // token: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  isAuthenticated?: boolean;
  setIsAuthenticated: (auth:boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    username: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      username: '',
    });
    localStorage.removeItem('User');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
