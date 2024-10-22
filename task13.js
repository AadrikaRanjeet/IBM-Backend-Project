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

// Function to search for books by title using a Promise
function findBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        const booksByTitle = books.filter(b => b.title.toLowerCase() === title.toLowerCase());

        // Simulate an asynchronous database search
        setTimeout(() => {
            if (booksByTitle.length > 0) {
                resolve(booksByTitle);  // Resolve with the list of books if found
            } else {
                reject(`No books found with the title "${title}".`);  // Reject with an error if no books are found
            }
        }, 1000);  // Simulating a 1-second delay
    });
}

// Route to search for books by title
app.get("/books/title/:title", (req, res) => {
    const title = req.params.title;

    // Call the function and handle the Promise
    findBooksByTitle(title)
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
