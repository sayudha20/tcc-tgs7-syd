import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/')}>Notes App</h1>
      {user ? (
        <div className="nav-links">
          <span>Hello, {user.username}</span>
          <button onClick={() => navigate('/notes')}>My Notes</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="nav-links">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;