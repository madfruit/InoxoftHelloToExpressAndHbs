const router = require('express').Router();
const userController = require('../controllers/user.controller');

const { checkEmailExists, userExists, checkNewUserData } = require('../middlewares/user.middleware');

router.get('/:user_email', userController.getUserByEmail);
router.get('/', userController.getAllUsers);
router.delete('/:user_email', userExists, userController.deleteUserByEmail);
router.put('/:user_email', userExists, userController.updateUser);
router.post('/', checkNewUserData, checkEmailExists, userController.createUser);

module.exports = router;
