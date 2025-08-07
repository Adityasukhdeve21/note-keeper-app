import { createSlice } from '@reduxjs/toolkit'

const loadNotesFromStorage = () => {
  try {
    const savedNotes = localStorage.getItem('notekeeper_notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  } catch (error) {
    console.error('Error loading notes from localStorage:', error)
    return []
  }
}

const saveNotesToStorage = (notes) => {
  try {
    localStorage.setItem('notekeeper_notes', JSON.stringify(notes))
  } catch (error) {
    console.error('Error saving notes to localStorage:', error)
  }
}

const initialState = {
  notes: loadNotesFromStorage(),
  searchTerm: '',
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title,
        content: action.payload.content,
      }
      state.notes.unshift(newNote)
      saveNotesToStorage(state.notes)
    },
    updateNote: (state, action) => {
      const { id, title, content } = action.payload
      const index = state.notes.findIndex(note => note.id === id)
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          title,
          content
        }
        saveNotesToStorage(state.notes)
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
      saveNotesToStorage(state.notes)
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

export const {
  addNote,
  updateNote,
  deleteNote,
  setSearchTerm,
} = notesSlice.actions

export const selectNotes = (state) => state.notes.notes
export const selectSearchTerm = (state) => state.notes.searchTerm
export const selectFilteredNotes = (state) => {
  const { notes, searchTerm } = state.notes
  if (!searchTerm) return notes

  return notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export default notesSlice.reducer