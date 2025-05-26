const express = require('express');
const router = express.Router();
const { 
  getNotes, 
  createNote, 
  updateNote, 
  deleteNote 
} = require('../controllers/notesController');
const auth = require('../middlewares/auth');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

module.exports = router;