const bookService = require('../services/book.service');

const statusCodes = require('../configs/statusCodes.enum');

module.exports = {
    createBook: async (req, res, next) => {
        try {
            const bookToAdd = req.body;
            const book = await bookService.createBook(bookToAdd);
            res.status(statusCodes.CREATED).json(book);
        } catch (e) {
            next(e);
        }
    },

    getBookById: (req, res, next) => {
        try {
            const { book } = req;
            res.json(book);
        } catch (e) {
            next(e);
        }
    },

    getAllBooks: async (req, res, next) => {
        try {
            const books = await bookService.findBooks(req.query);
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

    buyBook: async (req, res, next) => {
        try {
            const { amount } = req.body;
            const { book } = req;
            await bookService.buyBook(book, amount);
            res.json(book);
        } catch (e) {
            next(e);
        }
    }
};
