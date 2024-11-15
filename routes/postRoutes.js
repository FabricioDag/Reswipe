const express = require('express');
const { createPost, getPosts, likePost, addCommentToPost } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.post('/:id/like', likePost);
router.post('/:id/comment', addCommentToPost);

module.exports = router;
