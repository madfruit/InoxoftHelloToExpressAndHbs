const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/:user_email', userController.getUserByEmail);
router.get('/', userController.getAllUsers);

module.exports = router;
