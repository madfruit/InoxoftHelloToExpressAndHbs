const { Book } = require('../database');

const queryService  = require('./query.service');

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
    },

    findBooks: async (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };
        const filterObject = queryService.getFilterObject(filters);

        const books = await Book
            .find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);
        const count = await Book.countDocuments(filterObject);
        return {
            data: books,
            page,
            limit: +perPage,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
