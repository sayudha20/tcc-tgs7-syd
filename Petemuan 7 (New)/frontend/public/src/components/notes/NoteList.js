import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotes } from '../../context/NotesContext';
import NoteItem from './NoteItem';

const NotesList = () => {
  const { token } = useAuth();
  const { notes, loading, error, getNotes } = useNotes();

  useEffect(() => {
    if (token) {
      getNotes(token);
    }
  }, [token, getNotes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="notes-list">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;