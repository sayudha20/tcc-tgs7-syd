const jwt = require('jsonwebtoken');
const User = require('backend/src/models/User');
const { errorHandler } = require('../utils/errorHandler');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create user
    const userId = await User.create({ username, email, password });
    
    // Generate token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(201).json({ token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.json({ token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { register, login, getMe };