import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppContext } from './context/AppContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotesPage from './pages/NotesPage.jsx'
import './App.css'

function App() {
  const { user, theme } = useAppContext()

  return (
    <div className={`app ${theme}`}>
      <Routes> 
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/notes" replace />} 
        />
        <Route 
          path="/notes" 
          element={user ? <NotesPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/notes" : "/login"} replace />} 
        />
      </Routes>
    </div>
  )
}

export default App