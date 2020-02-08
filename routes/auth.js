const router = require('express').Router();
const userController = require('../controllers/auth.js');
//, require('../validators/index.js').createPostValidator

// @route   POST /signup
// @desc    User Signup
// @access  Public
router.post('/signup', require('../validators/index.js').userSignupValidator, userController.signup);

// @route   POST /signup
// @desc    User Signup
// @access  Public
router.post('/signin', userController.signin);

// @route   GET /signout
// @desc    User Signout
// @access  Public
router.get('/signout', userController.signout);

module.exports = router;
