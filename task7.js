const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory storage for users (replace with a database in a real-world app)
let users = [];

// Route to register a new user
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).send('User with this email already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user
    users.push({ username, email, password: hashedPassword });
    res.status(201).send('User registered successfully');
});

// Route to log in a registered user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Incorrect password');
    }

    // If login is successful, you can return a success message (or a session token in a real-world app)
    res.send('Login successful');
});

// Route to add or modify a review for a specific book using its ID
app.post("/books/:id/review", (req, res) => {
    const bookId = parseInt(req.params.id);
    const { user, rating, comment } = req.body;

    // Find the book by its ID
    const book = books.find(b => b.id === bookId);

    if (book) {
        // Check if the user has already reviewed the book
        const existingReview = book.reviews.find(r => r.user === user);

        if (existingReview) {
            // Modify the existing review
            existingReview.rating = rating;
            existingReview.comment = comment;
            res.send(`Review updated for book "${book.title}" by ${user}.`);
        } else {
            // Add a new review
            const newReview = { user, rating, comment };
            book.reviews.push(newReview);
            res.send(`Review added for book "${book.title}" by ${user}.`);
        }
    } else {
        res.status(404).send("Book not found.");
    }
});
// Route to delete a review for a specific book by a specific user
app.delete("/books/:id/review", (req, res) => {
    const bookId = parseInt(req.params.id);
    const { user } = req.body;

    const book = books.find(b => b.id === bookId);

    if (book) {
        const reviewIndex = book.reviews.findIndex(r => r.user === user);

        if (reviewIndex !== -1) {
            book.reviews.splice(reviewIndex, 1);
            res.send(`Review by ${user} deleted from book "${book.title}".`);
        } else {
            res.status(404).send(`Review by ${user} not found for book "${book.title}".`);
        }
    } else {
        res.status(404).send("Book not found.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
