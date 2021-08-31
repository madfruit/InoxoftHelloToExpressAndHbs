const bookService = require('../services/book.service');

module.exports = {
    createBook: async (req, res, next) => {
        try {
            const bookToAdd = req.body;
            const book = await bookService.createBook(bookToAdd);
            res.json(book);
        } catch (e) {
            next(e);
        }
    },

    getBookById: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const book = await bookService.getBookById(book_id);
            res.json(book);
        } catch (e) {
            next(e);
        }
    },

    getAllBooks: async (req, res, next) => {
        try {
            const books = await bookService.getAllBooks();
            res.json(books);
        } catch (e) {
            next(e);
        }
    },

    updateBook: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const bookToUpdate = req.body;
            const book = await bookService.updateBook(bookToUpdate, book_id);
            res.json(book);
        } catch (e) {
            next(e);
        }
    },

    deleteBook: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            await bookService.deleteBook(book_id);
            res.json(book_id);
        } catch (e) {
            next(e);
        }
    },
};
