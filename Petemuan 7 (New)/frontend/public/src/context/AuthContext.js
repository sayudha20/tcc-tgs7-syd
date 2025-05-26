import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, getMe } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getMe(token);
          setUser(userData);
        } catch (error) {
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const { token } = await authLogin(email, password);
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/notes');
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { token } = await authRegister(username, email, password);
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/notes');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);