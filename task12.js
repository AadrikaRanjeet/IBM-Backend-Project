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

// Function to search for books by an author using a Promise
function findBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        const booksByAuthor = books.filter(b => b.author.toLowerCase() === author.toLowerCase());

        // Simulate an asynchronous database search
        setTimeout(() => {
            if (booksByAuthor.length > 0) {
                resolve(booksByAuthor);  // Resolve with the list of books if found
            } else {
                reject(`No books found for author ${author}.`);  // Reject with an error if no books are found
            }
        }, 1000);  // Simulating a 1-second delay
    });
}

// Route to search for books by author
app.get("/books/author/:author", (req, res) => {
    const author = req.params.author;

    // Call the function and handle the Promise
    findBooksByAuthor(author)
        .then(books => {
            res.json(books);  // Send the list of books as JSON if found
        })
        .catch(err => {
            res.status(404).send(err);  // Send the error message if no books are found
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
