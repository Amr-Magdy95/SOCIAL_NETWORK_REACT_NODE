const router = require('express').Router();
const postController = require('../controllers/post.js');
const userController = require('../controllers/user.js');
const { requireSignin } = require('../controllers/auth.js');

// @route   GET /
// @desc    Get All Posts
// @access  Public
router.get('/', postController.getPosts);

// @route   POST /post
// @desc    Create a new post
// @access  Private
router.post('/post', requireSignin,require('../validators/index.js').createPostValidator, postController.createPost);

// any route containing userID param our program will first run this function
router.param("userId", userController.userById)

module.exports = router;
