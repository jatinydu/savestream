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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    username: '',
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('User', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      username: '',
    });
    localStorage.removeItem('User');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
