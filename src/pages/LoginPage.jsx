import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import ThemeToggle from '../component/ThemeToggle.jsx'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const { login } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedUsername = username.trim()
    
    if (!trimmedUsername) {  
      setError('Please enter a username')
      return
    }
    
    if (trimmedUsername.length < 2) {
      setError('Username must be at least 2 characters long')
      return
    }
    
    login(trimmedUsername)
  }

  return (
    <div className="login-page">
      <div className="login-header">
        <h1> NoteKeeper</h1>
        <ThemeToggle />
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome to NoteKeeper</h2>
          <p>Enter your username to get started</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError('')
                }}
                placeholder="Enter your username"
                className={error ? 'error' : ''}
                autoFocus
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage