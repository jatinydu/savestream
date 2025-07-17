import { ToastContext } from '../context/ToastContext';
import { useContext } from 'react';

type ToastData = {
    id: number;
    message: string;
    variant?: 'success' | 'error' | 'warning' | 'info';
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    duration?: number;
  };

type ToastContextType = {
    showToast: (options: Omit<ToastData, 'id'>) => void;
};

const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default useToast;