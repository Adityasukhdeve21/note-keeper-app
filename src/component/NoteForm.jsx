import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNote, updateNote } from '../redux/notesSlice.js'

function NoteForm({ note, onClose }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note]) 

  const validateForm = () => { 
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (note) {
      dispatch(updateNote({
        id: note.id,
        title: title.trim(),
        content: content.trim()
      }))
    } else {
      dispatch(addNote({
        title: title.trim(),
        content: content.trim()
      }))
    }
    
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="note-form">
      <h3>{note ? 'Edit Note' : 'Add New Note'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="note-title">Title</label>
          <input
            type="text"
            id="note-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (errors.title) {
                setErrors({ ...errors, title: '' })
              }
            }}
            placeholder="Enter note title"
            className={errors.title ? 'error' : ''}
            autoFocus
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="note-content">Content</label>
          <textarea
            id="note-content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              if (errors.content) {
                setErrors({ ...errors, content: '' })
              }
            }}
            placeholder="Enter note content"
            rows="8"
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            {note ? 'Update Note' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm