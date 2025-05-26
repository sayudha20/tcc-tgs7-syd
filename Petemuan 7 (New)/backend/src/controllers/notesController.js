const Note = require('backend/src/models/Note');
const { errorHandler } = require('../utils/errorHandler');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.findByUserId(req.user.id);
    res.json(notes);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = await Note.create({
      title,
      content,
      userId: req.user.id
    });
    
    const note = await Note.findByIdAndUserId(noteId, req.user.id);
    res.status(201).json(note);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    await Note.updateByIdAndUserId(id, req.user.id, { title, content });
    const note = await Note.findByIdAndUserId(id, req.user.id);
    
    res.json(note);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.deleteByIdAndUserId(id, req.user.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };