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

// Async function to get all books
async function getAllBooks(callback) {
    // Simulate a delay of 1 second to fetch books
    setTimeout(() => {
        callback(null, books);
    }, 1000);
}

// Route to fetch all books using async callback function
app.get("/books", (req, res) => {
    // Use the async function to get all books
    getAllBooks((err, allBooks) => {
        if (err) {
            return res.status(500).send("Error fetching books.");
        }
        res.json(allBooks);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
