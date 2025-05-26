import { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';

const NoteForm = ({ note, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const { createNote, updateNote } = useNotes();
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (note) {
        await updateNote(token, note.id, { title, content });
      } else {
        await createNote(token, { title, content });
      }
      onCancel?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <div className="form-actions">
        <button type="submit">{note ? 'Update' : 'Create'}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;