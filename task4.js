/* Get all books based on title */

const express = require("express");
const app = express();
const port = 3002;

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, ISBN: "9780743273565" },
    { id: 2, title: "1984", author: "George Orwell", price: 9.99, ISBN: "9780451524935" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, ISBN: "9780061120084" },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, ISBN: "9780316769488" }
];

// Route to get all books by title
app.get("/books/title/:title", (req, res) => {
    const title = req.params.title.trim(); // Remove any leading/trailing spaces

    // Filter the books array to find all books by the specified title
    const titleBooks = books.filter(b => b.title.toLowerCase().trim() === title.toLowerCase());

    // If no books are found, send a "not found" message; otherwise, return the books
    if (titleBooks.length > 0) {
        res.send(titleBooks);
    } else {
        res.status(404).send(`No books found with title "${title}"`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
