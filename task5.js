/*Get a Book Review */


const express = require("express");
const app = express();
const port = 3001;

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, ISBN: "9780743273565" ,reviews: [
        { reviewer: "Alice", comment: "A timeless classic!", rating: 5 },
        { reviewer: "Bob", comment: "Felt a bit overrated.", rating: 3 }
    ]},
    { id: 2, title: "1984", author: "George Orwell", price: 9.99, ISBN: "9780451524935",reviews: [
        { reviewer: "Alice", comment: "A timeless classic!", rating: 5 },
        { reviewer: "Bob", comment: "Felt a bit overrated.", rating: 3 }
    ] },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, ISBN: "9780061120084" },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, ISBN: "9780316769488" }
];

// Route to get reviews for a specific book by ISBN
app.get("/books/reviews/:isbn", (req, res) => {
    const isbn = req.params.isbn.trim();
    const book = books.find(b => b.ISBN === isbn);

    if (book) {
        res.send(book.reviews);
    } else {
        res.status(404).send(`Book with ISBN ${isbn} not found`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});