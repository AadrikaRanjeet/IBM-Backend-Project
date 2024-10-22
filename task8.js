const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(bodyParser.json());

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, ISBN: "9780743273565", reviews: [] },
    { id: 2, title: "1984", author: "George Orwell", price: 9.99, ISBN: "9780451524935", reviews: [] },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, ISBN: "9780061120084", reviews: [] },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, ISBN: "9780316769488", reviews: [] }
];

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

// Route to get all reviews for a specific book
app.get("/books/:id/reviews", (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (book) {
        res.send(book.reviews.length > 0 ? book.reviews : "No reviews for this book yet.");
    } else {
        res.status(404).send("Book not found.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
