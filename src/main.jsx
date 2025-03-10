import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import Router from './Router/Router';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskProvider from './context/TaskProvider';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <TaskProvider>
        <QueryClientProvider client={queryClient}>
  <RouterProvider router={Router} />
  <ToastContainer autoClose={2000} position={'top-center'} />
  </QueryClientProvider>
  </TaskProvider>
    </AuthProvider>

)
