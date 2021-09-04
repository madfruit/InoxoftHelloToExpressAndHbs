const router = require('express').Router();

const bookController = require('../controllers/book.controller');
const { authMiddleware, bookMiddleware, userMiddleware } = require('../middlewares');
const { userRoles } = require('../configs');

router.get('/', bookController.getAllBooks);
router.get('/:book_id', bookMiddleware.checkBookById, bookController.getBookById);
router.delete(
    '/:book_id',
    authMiddleware.checkToken('access'),
    userMiddleware.checkUserRole([userRoles.ADMIN]),
    bookMiddleware.checkBookById,
    bookController.deleteBook
);
router.put(
    '/:book_id',
    authMiddleware.checkToken('access'),
    userMiddleware.checkUserRole([userRoles.ADMIN]),
    bookMiddleware.checkBookById,
    bookController.updateBook
);
router.post(
    '/',
    authMiddleware.checkToken('access'),
    userMiddleware.checkUserRole([userRoles.ADMIN]),
    bookMiddleware.checkBookAlreadyExists,
    bookController.createBook
);
router.post(
    '/buy/:book_id',
    authMiddleware.checkToken('access'),
    bookMiddleware.checkBookById,
    bookMiddleware.checkBookAvailability,
    bookController.buyBook
);

module.exports = router;
