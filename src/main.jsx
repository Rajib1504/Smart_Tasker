import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import Router from './Router/Router';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
  <RouterProvider router={Router} />
  <ToastContainer autoClose={2000} position={'top-center'} />
    </AuthProvider>

)
