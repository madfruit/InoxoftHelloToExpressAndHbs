const router = require('express').Router();

const bookController = require('../controllers/book.controller');
const { checkBookById, checkBookAlreadyExists } = require('../middlewares/book.middleware');

router.get('/', bookController.getAllBooks);
router.get('/:book_id', bookController.getBookById);
router.delete('/:book_id', checkBookById, bookController.deleteBook);
router.put('/:book_id', checkBookById, bookController.updateBook);
router.post('/', checkBookAlreadyExists, bookController.createBook);

module.exports = router;
