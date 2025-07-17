import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/lib/Toast';

interface ToastProps {
  id: number; 
  message: string;
  duration?: number;
  variant?: 'success' | 'error' | 'info' | 'warning';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

type ToastContextType = {
    showToast: (options: Omit<ToastProps, 'id'>) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    
    const showToast = (options: Omit<ToastProps, 'id'>) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, ...options }]);
      };

      const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      };
    
      return (
        <ToastContext.Provider value={{ showToast }}>
          {children}
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              variant={toast.variant}
              position={toast.position}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </ToastContext.Provider>
      );
}
