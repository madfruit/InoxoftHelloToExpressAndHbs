const { Book } = require('../database');

module.exports = {
    createBook: async (BookObject) => {
        const book = await Book.create(BookObject);
        return book;
    },

    getAllBooks: async () => {
        const books = await Book.find({});
        return books;
    },

    getBookById: async (bookId) => {
        const book = await Book.findById(bookId);
        return book;
    },

    findBooks: async (book_name) => {
        const booksInDB = await Book.find({ name: book_name });
        return booksInDB;
    },

    findBook: async (book_name, book_author, book_publisher) => {
        const bookInDB = await Book.findOne({ name: book_name, author: book_author, publisher: book_publisher });
        return bookInDB;
    },

    updateBook: async (book, bookId) => {
        const updatedBook = await Book.findByIdAndUpdate(bookId, book);
        return updatedBook;
    },

    deleteBook: async (bookId) => {
        await Book.findByIdAndDelete(bookId);
    },

    buyBook: async (bookToBuy, bookAmount) => {
        const book = bookToBuy;
        book.amount -= bookAmount;
        await Book.findByIdAndUpdate(bookToBuy._id, bookToBuy);
        return book;
    }
};
