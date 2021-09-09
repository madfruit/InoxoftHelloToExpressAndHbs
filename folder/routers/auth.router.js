const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/reset', userMiddleware.getUserByDynamicParam('email', 'body'), authController.startPasswordReset);
router.post('/reset/update', authMiddleware.checkResetToken, userMiddleware.checkUserPassword, authController.updatePassword);

router.post(
    '/',
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.userExists,
    authController.login
);

router.post('/logout', authMiddleware.checkToken('access'), authController.logout);
router.post('/refresh', authMiddleware.checkToken('refresh'), authController.refreshToken);

module.exports = router;
