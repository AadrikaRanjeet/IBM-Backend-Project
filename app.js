const express = require('express');
const bcrypt = require('bcryptjs');  // For hashing passwords
const bodyParser = require('body-parser');  // Parse incoming requests

const app = express();
const port = 3000;

// Use body-parser to handle JSON requests
app.use(bodyParser.json());

// Sample user storage (for simplicity, using an array, but usually you'd use a database like MongoDB, MySQL, etc.)
let users = [];

// Route to register a new user
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).send('Please provide all required fields (username, email, password).');
    }

    // Check if the user already exists (you can check this in your database)
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).send('User with this email already exists.');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword
        };

        // Add the user to the users array
        users.push(newUser);

        // Respond with success
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
