const express = require('express');
const { register, login, refresh_token } = require('../controllers/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refresh_token);

module.exports = router;
