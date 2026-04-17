const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { getUserById, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/user');

const router = express.Router();

// Protected routes - all require authentication
router.use(authenticate);

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/createUser', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
