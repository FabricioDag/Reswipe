const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); // Sem as chaves

const authController = require('../controllers/authController');

router.get('/user/:id',ensureAuthenticated, authController.privateRoute);
router.post('/loginUser', authController.loginUser); //loginUser
router.post('/register', authController.registerUser); // registerUser

module.exports = router;