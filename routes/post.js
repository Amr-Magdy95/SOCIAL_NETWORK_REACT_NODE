const router = require('express').Router();
const postController = require('../controllers/post.js');

// @route   GET /
// @desc    Get All Posts
// @access  Public
router.get('/', postController.getPosts);

// @route   POST /post
// @desc    Create a new post
// @access  Public
router.post('/post', require('../validators/index.js').createPostValidator, postController.createPost);

module.exports = router;
