const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); 

const postController = require('../controllers/postController');

router.post('/', ensureAuthenticated, postController.createPost); //createPost Somente autenticado
router.get('/', postController.getPosts);

router.post('/:id/like', postController.likePost);
router.post('/:id/comment', postController.addCommentToPost);

module.exports = router;
