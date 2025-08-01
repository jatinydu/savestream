import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ToastProvider from './context/ToastContext.tsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
  <AuthProvider>
  <ToastProvider>
  <PostProvider>
    <App />
  </PostProvider>
  </ToastProvider>
  </AuthProvider>
  </BrowserRouter>
  </StrictMode>,
)
