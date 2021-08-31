const ErrorHandler = require('../errors/ErrorHandler');
const bookService = require('../services/book.service');

module.exports = {
    checkBookAlreadyExists: async (req, res, next) => {
        try {
            const { name, author, publisher } = req.body;

            const bookInDB = await bookService.findBook(name, author, publisher);

            if (bookInDB) {
                throw new ErrorHandler(409, 'This book already exists in database');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkBookById: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const bookInDB = await bookService.getBookById(book_id);
            if (!bookInDB) {
                throw new ErrorHandler(404, 'Book not found');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
