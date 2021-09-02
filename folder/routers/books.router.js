const router = require('express').Router();

const bookController = require('../controllers/book.controller');
const { checkBookById, checkBookAlreadyExists, checkBookAvailability } = require('../middlewares/book.middleware');

router.get('/', bookController.getAllBooks);
router.get('/:book_id', checkBookById, bookController.getBookById);
router.delete('/:book_id', checkBookById, bookController.deleteBook);
router.put('/:book_id', checkBookById, bookController.updateBook);
router.post('/', checkBookAlreadyExists, bookController.createBook);
router.post('/buy/:book_id', checkBookById, checkBookAvailability, bookController.buyBook);

module.exports = router;
