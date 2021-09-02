const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userRoles = require('../configs/userRoles.enum');

const {
    checkEmailExists,
    userExists,
    checkNewUserData,
    getUserByDynamicParam,
    checkUserRole,
} = require('../middlewares/user.middleware');

router.use('/:user_email', getUserByDynamicParam('user_email', 'params', 'email'), userExists);

router.get('/:user_email', userController.getUserByEmail);
router.get('/', userController.getAllUsers);
router.delete('/:user_email', checkUserRole([userRoles.ADMIN]), userController.deleteUserByEmail);
router.put('/:user_email', userController.updateUser);
router.post(
    '/',
    checkNewUserData,
    getUserByDynamicParam('email'),
    checkEmailExists,
    userController.createUser
);

module.exports = router;
