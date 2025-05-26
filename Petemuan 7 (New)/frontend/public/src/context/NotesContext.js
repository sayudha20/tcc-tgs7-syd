import { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchNotes, 
  createNote as apiCreateNote, 
  updateNote as apiUpdateNote, 
  deleteNote as apiDeleteNote 
} from '../services/notesService';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNotes = async (token) => {
    setLoading(true);
    try {
      const notesData = await fetchNotes(token);
      setNotes(notesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (token, noteData) => {
    try {
      const newNote = await apiCreateNote(token, noteData);
      setNotes(prev => [newNote, ...prev]);
    } catch (err) {
      throw err;
    }
  };

  const updateNote = async (token, id, noteData) => {
    try {
      const updatedNote = await apiUpdateNote(token, id, noteData);
      setNotes(prev => 
        prev.map(note => note.id === id ? updatedNote : note)
      );
    } catch (err) {
      throw err;
    }
  };

  const deleteNote = async (token, id) => {
    try {
      await apiDeleteNote(token, id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        loading, 
        error, 
        getNotes, 
        createNote, 
        updateNote, 
        deleteNote 
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);