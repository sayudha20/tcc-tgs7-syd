import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import Navbar from './components/Navbar';
import Login from '/components/Auth/Login';
import Register from '/components/Auth/Register';
import NotesList from '/components/Notes/NotesList';
import NoteForm from '/components/Notes/NoteForm';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotesProvider>
          <div className="app">
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/notes" element={<NotesList />} />
                <Route path="/notes/new" element={<NoteForm />} />
              </Routes>
            </div>
          </div>
        </NotesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;