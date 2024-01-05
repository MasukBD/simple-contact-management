import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './Layout/Main';
import HomePage from './Components/Pages/HomePage';
import AddContact from './Components/Pages/AddContact';
import AllContacts from './Components/Pages/AllContacts';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorPage from './Components/SharedComponent/ErrorPage';
import { Toaster } from 'react-hot-toast';
import Login from './Components/AuthComponent/Login';
import Register from './Components/AuthComponent/Register';
import AuthProvider from './Provider/AuthProvider';
import PrivateRoute from './Routes/PrivateRoute';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: "/addContact",
        element: <PrivateRoute><AddContact></AddContact></PrivateRoute>
      },
      {
        path: "/allContacts",
        element: <PrivateRoute><AllContacts></AllContacts></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div className='max-w-screen-2xl mx-auto'>
            <RouterProvider router={router} />
            <Toaster></Toaster>
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
