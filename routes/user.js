const router = require('express').Router();
const userController = require('../controllers/user.js');
const { requireSignin } = require('../controllers/auth.js');

// @route    GET /users
// @desc     Get all users
// @access   public
router.get('/users', userController.allUsers);

// @route    GET /user/:userId
// @desc     Get a single user
// @access   Protected
router.get('/user/:userId', requireSignin, userController.getUser);

// @route    PUT /user/:userId
// @desc     Update a user
// @access   Private
router.put('/user/:userId',requireSignin, userController.hasAuthorization, userController.updateUser);

// @route    DELETE /user/:userId
// @desc     Delete a user
// @access   Private
router.delete('/user/:userId',requireSignin, userController.hasAuthorization, userController.deleteUser);

// any route containing userID param our program will first run this function
router.param("userId", userController.userById)

module.exports = router;
