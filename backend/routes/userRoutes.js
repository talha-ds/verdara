const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;