import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastContainer } from 'react-toastify';

import { LoaderProvider } from './context/loaderContext.jsx'

import './index.css'
import Login from './pages/Login'
import Home from './pages/Home'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <LoaderProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </BrowserRouter>  
      </LoaderProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
