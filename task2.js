/* Get the books based on ISBN */

const express=require("express")
const app=express();
const port=3001;

let books =[
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, ISBN: "9780743273565" },
    { id: 2, title: "1984", author: "George Orwell", price: 9.99, ISBN: "9780451524935" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, ISBN: "9780061120084" },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 8.99, ISBN: "9780316769488" }
];

//Route to get a book by its ISBN
app.get("/books/:isbn",(req,res)=>{
    const isbn=req.params.isbn;
    const book=books.find(b=>b.ISBN===isbn);

    //if the books is found , return id; else, send a "not found" meassage
    if(book)
    {
        res.send(book);
    }
    else
    {
        res.status(404).send(`Book with ISBN ${isbn} not found`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
