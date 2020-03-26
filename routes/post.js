const router = require('express').Router();
const postController = require('../controllers/post.js');
const userController = require('../controllers/user.js');
const { requireSignin } = require('../controllers/auth.js');

// @route   Update /post/like
// @desc    Like a post
// @access  Private
router.put(
  '/post/like',
  requireSignin,
  postController.like
);

// @route   Update /post/unlike
// @desc    Unlike a post
// @access  Private
router.put(
  '/post/unlike',
  requireSignin,
  postController.unlike
);

// @route   GET /
// @desc    Get All Posts
// @access  Public
router.get('/', postController.getPosts);

// @route   GET /post/:postId
// @desc    Get a single Post
// @access  Public
router.get('/post/:postId', postController.singlePost);

// @route    GET /post/photo/:postId
// @desc     Get a post's photo
// @access   Public
router.get('/post/photo/:postId',postController.postPhoto);

// @route   POST /post/new/:userId
// @desc    Create a new post
// @access  Private
router.post(
  '/post/new/:userId',
  requireSignin,
  postController.createPost,
  require('../validators/index.js').createPostValidator
);

// @route   GET /post/by/:userId
// @desc    Get posts of a certain user
// @access  Private
router.get(
  '/posts/by/:userId',
  requireSignin,
  postController.postsByUser
);

// @route   DELETE /post/by/:userId
// @desc    Delete a Post made by a certain User
// @access  Private
router.delete(
  '/post/:postId',
  requireSignin,
  postController.isPoster,
  postController.deletePost
);

// @route   Update /post/by/:userId
// @desc    Update a Post made by a certain User
// @access  Private
router.put(
  '/post/:postId',
  requireSignin,
  postController.isPoster,
  postController.updatePost
);


// any route containing userID param our program will first run this function
router.param("userId", userController.userById)
// any route containing postId param our program will first run this function
router.param("postId", postController.postById)

module.exports = router;
