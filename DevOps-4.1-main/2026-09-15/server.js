const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'student_secret_key';
const TOKEN_EXPIRY = '1h';

app.use(express.json());

const users = [];
let students = [
  { id: 1, name: 'Rahul', department: 'CSE' },
  { id: 2, name: 'Priya', department: 'AI' },
];
let nextStudentId = 3;

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function passwordMatches(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(':');
  const suppliedHash = crypto.scryptSync(password, salt, 64);
  const storedHashBuffer = Buffer.from(storedHash, 'hex');

  return storedHashBuffer.length === suppliedHash.length
    && crypto.timingSafeEqual(storedHashBuffer, suppliedHash);
}

function createToken(user) {
  return jwt.sign(
    { sub: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRY },
  );
}

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Secure Student API' });
});

app.post('/register', (req, res) => {
  const { username, password, role = 'user' } = req.body;

  if (typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ message: 'username must be at least 3 characters' });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'password must be at least 6 characters' });
  }

  if (role !== 'user' && role !== 'admin') {
    return res.status(400).json({ message: 'role must be user or admin' });
  }

  const normalizedUsername = username.trim().toLowerCase();
  const existingUser = users.find((user) => user.username === normalizedUsername);

  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  users.push({
    username: normalizedUsername,
    passwordHash: hashPassword(password),
    role,
  });

  return res.status(201).json({
    message: 'User registered successfully',
    user: { username: normalizedUsername, role },
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const normalizedUsername = typeof username === 'string' ? username.trim().toLowerCase() : '';
  const user = users.find((registeredUser) => registeredUser.username === normalizedUsername);

  if (!user || typeof password !== 'string' || !passwordMatches(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  return res.json({
    message: 'Login successful',
    token: createToken(user),
    expiresIn: TOKEN_EXPIRY,
  });
});

app.get('/students', authMiddleware, (req, res) => {
  res.json({ user: req.user, students });
});

app.post('/students', authMiddleware, (req, res) => {
  const { name, department } = req.body;

  if (typeof name !== 'string' || !name.trim() || typeof department !== 'string' || !department.trim()) {
    return res.status(400).json({ message: 'name and department are required' });
  }

  const student = {
    id: nextStudentId++,
    name: name.trim(),
    department: department.trim(),
  };

  students.push(student);
  return res.status(201).json(student);
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Request body must contain valid JSON' });
  }

  return next(err);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Secure Student API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
