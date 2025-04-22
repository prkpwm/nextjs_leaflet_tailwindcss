const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4200;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// File paths
const usersFilePath = path.join(__dirname, 'users.json');
const contactsFilePath = path.join(__dirname, 'contactSubmissions.json');

// Ensure files exist
[usersFilePath, contactsFilePath].forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
});

// Helper functions
const readFromFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

const writeToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
};

// Routes
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const users = readFromFile(usersFilePath);
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });
    writeToFile(usersFilePath, users);
    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Error during registration.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const users = readFromFile(usersFilePath);
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, message: 'Login successful!', token, username: user.name });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error during login.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  try {
    const contacts = readFromFile(contactsFilePath);
    contacts.push({
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString()
    });
    writeToFile(contactsFilePath, contacts);
    res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while submitting your message.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});