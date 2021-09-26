const ErrorHandler = require('../errors/ErrorHandler');
const bookService = require('../services/book.service');
const idValidator = require('../validators/id.validator');
const statusCodes = require('../configs/statusCodes.enum');

module.exports = {
    checkBookAlreadyExists: async (req, res, next) => {
        try {
            const { name, author, publisher } = req.body;

            const bookInDB = await bookService.findBook(name, author, publisher);

            if (bookInDB) {
                throw new ErrorHandler(statusCodes.CONFLICT, 'This book already exists in database');
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
            req.book = bookInDB;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIdIsValid: (req, res, next) => {
        try {
            const { id } = req.params;

            idValidator.validateMongoId(id);
            next();
        } catch (e) {
            next(e);
        }
    },

    checkBookAvailability: (req, res, next) => {
        try {
            const { book } = req;
            const { amount } = req.body;

            if (amount > book.amount) {
                throw new ErrorHandler(statusCodes.CONFLICT, `Amount cannot be greater than ${book.amount}`);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
