import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  user: null,
  theme: 'light'
}

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load user and theme from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('notekeeper_user')
    const savedTheme = localStorage.getItem('notekeeper_theme')
    
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: savedUser })
    }
    
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    }
  }, [])

  // Save user to localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('notekeeper_user', state.user)
    } else {
      localStorage.removeItem('notekeeper_user')
    }
  }, [state.user])

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('notekeeper_theme', state.theme)
    document.body.className = state.theme
  }, [state.theme])

  const login = (username) => {
    dispatch({ type: 'LOGIN', payload: username })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const value = {
    user: state.user,
    theme: state.theme,
    login,
    logout,
    toggleTheme
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) { 
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}