import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export async function signup(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ error: 'Username already taken' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await new User({ username, password: hashed }).save();
  req.session.userId = user._id;
  res.status(201).json({ _id: user._id, username: user.username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  res.json({ _id: user._id, username: user.username });
}

export async function logout(req, res) {
  req.session.destroy();
  res.json({ message: 'Logged out' });
}

//check if the user has an active session
export async function getMe(req, res) {
  if (!req.session.userId) {
    return res.json(null);
  }
  const user = await User.findById(req.session.userId).select('-password');
  res.json(user);
}
