// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Enable CORS for cross-origin requests
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating JWT tokens

// Initialize the Express app
const app = express();
const PORT = 4200;
const JWT_SECRET = 'your-secret-key'; // Replace with a strong, unique secret key

// Middleware for parsing JSON data and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Path to the JSON file for user data
const usersFilePath = path.join(__dirname, 'users.json');

// Ensure the JSON file exists
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

// Helper function to read users from the JSON file
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing users file:', error);
    }
};

// Route: Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate request data
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Read users from the file
    const users = readUsersFromFile();

    // Check if the user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add new user to the list with the hashed password
        users.push({ name, email, password: hashedPassword });

        // Write updated users to the file
        writeUsersToFile(users);

        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error during registration.' });
    }
});

// Route: Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Read users from the file
    const users = readUsersFromFile();

    // Find user by email
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    try {
        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ userId: user.email }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

            res.status(200).json({ message: 'Login successful!', token, username: user.name });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ message: 'Error during login.' });
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (invalid token)
        }
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

// Protected route example (requires authentication)
app.get('/profile', authenticateToken, (req, res) => {
    // At this point, req.user contains the decoded JWT payload (e.g., { userId: 'user@example.com' })
    const users = readUsersFromFile();
    const user = users.find(u => u.email === req.user.userId);

    if (user) {
        res.status(200).json({ message: 'Profile data', user: { name: user.name, email: user.email } });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
});

// Route: Get all users (protected, for testing purposes, remove in production)
app.get('/users', authenticateToken, (req, res) => {
    const users = readUsersFromFile();
    res.status(200).json({ users });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});