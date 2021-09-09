const router = require('express').Router();

const { userRoles, actionTokens } = require('../configs');
const { userMiddleware, authMiddleware } = require('../middlewares');
const { adminController } = require('../controllers');

router.post(
    '/add',
    authMiddleware.checkToken('access'),
    userMiddleware.checkUserRole([userRoles.ADMIN]),
    userMiddleware.checkNewUserData,
    adminController.grantAdmin
);

router.post(
    '/password',
    userMiddleware.checkUserPassword,
    authMiddleware.checkActionToken(actionTokens.GRANT_ADMIN),
    adminController.changePassword
);

module.exports = router;
