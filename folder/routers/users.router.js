const router = require('express').Router();
const userController = require('../controllers/user.controller');

const { authMiddleware, userMiddleware, fileMiddleware } = require('../middlewares');

router.get('/history', authMiddleware.checkToken('access'), userController.getOrderHistory);

router.get('/', userController.getAllUsers);

router.get('/:user_email', userController.getUserByEmail);

router.delete(
    '/:user_email',
    authMiddleware.checkToken('access'),
    userMiddleware.canDeleteUser,
    userController.deleteUserByEmail
);
router.put('/:user_email', authMiddleware.checkToken('access'), userMiddleware.canUpdateUser, userController.updateUser);
router.post(
    '/',
    userMiddleware.checkNewUserData,
    fileMiddleware.checkUserAvatar,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.checkEmailExists,
    userController.createUser
);

router.use('/:user_email', userMiddleware.getUserByDynamicParam('user_email', 'params', 'email'), userMiddleware.userExists);

module.exports = router;
