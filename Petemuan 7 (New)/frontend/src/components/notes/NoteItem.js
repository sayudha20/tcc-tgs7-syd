import { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import NoteForm from './NoteForm';

const NoteItem = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteNote } = useNotes();
  const { token } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(token, note.id);
    }
  };

  if (isEditing) {
    return (
      <NoteForm 
        note={note} 
        onCancel={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;