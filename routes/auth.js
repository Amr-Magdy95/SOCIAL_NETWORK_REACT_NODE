const router = require('express').Router();
const authController = require('../controllers/auth.js');
const userController = require('../controllers/user.js');
//, require('../validators/index.js').createPostValidator

// @route   POST /signup
// @desc    User Signup
// @access  Public
router.post('/signup', require('../validators/index.js').userSignupValidator, authController.signup);

// @route   POST /signup
// @desc    User Signup
// @access  Public
router.post('/signin', authController.signin);

// @route   GET /signout
// @desc    User Signout
// @access  Public
router.get('/signout', authController.signout);

// any route containing userID param our program will first run this function
router.param("userId", userController.userById)

module.exports = router;
