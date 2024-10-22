/* Get all the books by author */

const express = require("express");
const app = express();
const port = 3001;

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, ISBN: "9780743273565" },
    { id: 2, title: "1984", author: "George Orwell", price: 9.99, ISBN: "9780451524935" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, ISBN: "9780061120084" },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, ISBN: "9780316769488" }
];

// Route to get all books by an author
app.get("/books/author/:author", (req, res) => {
    const author = req.params.author.trim(); // Remove any leading/trailing spaces

    // Filter the books array to find all books by the specified author
    const authorBooks = books.filter(b => b.author.toLowerCase().trim() === author.toLowerCase());

    // If no books are found, send a "not found" message; otherwise, return the books
    if (authorBooks.length > 0) {
        res.send(authorBooks);
    } else {
        res.status(404).send(`No books found by author ${author}`);
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});