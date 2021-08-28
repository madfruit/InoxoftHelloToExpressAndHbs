const router = require('express').Router();
const userController = require('../controllers/user.controller');

const { checkEmailExists, userExists } = require('../middlewares/user.middleware');

router.get('/:user_email', userController.getUserByEmail);
router.get('/', userController.getAllUsers);
router.delete('/:user_email', userExists, userController.deleteUserByEmail);
router.put('/:user_email', userExists, userController.updateUser);
router.post('/', checkEmailExists, userController.createUser);

module.exports = router;
