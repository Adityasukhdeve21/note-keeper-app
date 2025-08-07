import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
 
function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext()

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? 'DARK' : 'LIGHT'}
    </button>
  )
}

export default ThemeToggle