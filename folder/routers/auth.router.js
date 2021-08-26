const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.get('/auth', authController.getAuthPage);
router.post('/auth', authController.auth);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);

module.exports = router;
