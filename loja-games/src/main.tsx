import { StrictMode } from 'react'
import type { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from 'react-modal'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Home from './pages/Home.tsx'
import Jogos from './pages/Jogos.tsx'
import Sobre from './pages/Sobre.tsx'

import useAuth from './hooks/useAuth.ts'
import { AuthProvider } from './context/auth.tsx'

Modal.setAppElement('#root')

type PrivateProps = { Item: ComponentType }

const Private = ({ Item }: PrivateProps) => {
  const { signed, loading } = useAuth()

  if (loading) {
    return <p className="text-center text-gray-600 py-20">Carregando...</p>
  }

  return signed ? <Item /> : <Navigate to="/" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/jogos', element: <Private Item={Jogos} /> },
      { path: '/sobre', element: <Sobre /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
