const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, ISBN: "9780743273565", reviews: [] },
    { id: 2, title: "1984", author: "George Orwell", price: 9.99, ISBN: "9780451524935", reviews: [] },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, ISBN: "9780061120084", reviews: [] },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, ISBN: "9780316769488", reviews: [] }
];

// Function to search for a book by its ISBN using a Promise
function findBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        const book = books.find(b => b.ISBN === isbn);

        // Simulate an asynchronous database search
        setTimeout(() => {
            if (book) {
                resolve(book);  // If book is found, resolve with the book data
            } else {
                reject(`Book with ISBN ${isbn} not found.`);  // If not found, reject with an error
            }
        }, 1000);  // Simulating 1-second delay
    });
}

// Route to search for a book by ISBN
app.get("/books/isbn/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    // Call the function and handle the Promise
    findBookByISBN(isbn)
        .then(book => {
            res.json(book);  // If resolved, send the book data
        })
        .catch(err => {
            res.status(404).send(err);  // If rejected, send the error message
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
