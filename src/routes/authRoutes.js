const express = require('express');
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { loginValidator } = require('../utils/validators');

const router = express.Router();

router.post('/login', loginValidator, login);
router.get('/me', protect, getMe);

module.exports = router;
