/*TASK 1 : Get the book list available in the shop */
const express = require('express');
const app = express();
const PORT = 3000;  

// Mock data: List of books available in the shop
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 9.99 },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99 },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99 },
];

// Route to get the list of books
app.get("/books", (req, res) => {
    res.send(books);  // Sends the list of books as the response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
