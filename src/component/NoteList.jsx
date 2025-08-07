import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../redux/notesSlice'

function NoteList({ notes, onEdit }) {
  const dispatch = useDispatch()

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      dispatch(deleteNote(id))
    }
  }

  const truncate = (text, max = 150) =>
    text.length > max ? text.slice(0, max) + '...' : text

  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <div className="note-actions">
              <button onClick={() => onEdit(note)} className="edit-btn" title="Edit">
                EDITS
              </button>
              <button onClick={() => handleDelete(note.id, note.title)} className="delete-btn" title="Delete">
                DELETE
              </button>
            </div>
          </div>
          <div className="note-content">
            {truncate(note.content)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NoteList