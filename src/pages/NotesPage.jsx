import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppContext } from '../context/AppContext.jsx'
import { setSearchTerm, selectFilteredNotes, selectSearchTerm } from '../redux/notesSlice.js'
import NoteForm from '../component/NoteForm.jsx'
import NoteList from '../component/NoteList.jsx'
import ThemeToggle from '../component/ThemeToggle.jsx'

function NotesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  
  const dispatch = useDispatch()
  const { user, logout } = useAppContext() 
  const notes = useSelector(selectFilteredNotes)
  const searchTerm = useSelector(selectSearchTerm)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  const handleAddNote = () => {
    setEditingNote(null)
    setShowForm(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingNote(null)
  }

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
    <div className="notes-page">
      <header className="notes-header">
        <div className="header-left">
          <h1> NoteKeeper</h1>
          <span className="welcome-text">Welcome, {user}!</span>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="notes-container">
        <div className="notes-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <button onClick={handleAddNote} className="add-note-btn">
            + Add Note
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={handleCloseForm}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <NoteForm 
                note={editingNote} 
                onClose={handleCloseForm}
              />
            </div>
          </div>
        )}

        <div className="notes-content">
          {notes.length === 0 ? (
            <div className="empty-state">
              {searchTerm ? (
                <>
                  <h3>No notes found</h3>
                  <p>No notes match your search criteria</p>
                </>
              ) : (
                <>
                  <h3>No notes yet</h3>
                  <p>Click "Add Note" to create your first note</p>
                </>
              )}
            </div>
          ) : (
            <NoteList notes={notes} onEdit={handleEditNote} />
          )}
        </div>
      </div>
    </div>
  )
}

export default NotesPage