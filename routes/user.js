const router = require('express').Router();
const userController = require('../controllers/user.js');
const { requireSignin } = require('../controllers/auth.js');

// @route    PUT /user/follow
// @desc     Handles following a user
// @access   protected
router.put('/user/follow', requireSignin, userController.addFollowing, userController.addFollower);

// @route    PUT /user/unfollow
// @desc     Handles unfollowing a user
// @access   protected
router.put('/user/unfollow', requireSignin, userController.removeFollowing, userController.removeFollower);

// @route    GET /users
// @desc     Get all users
// @access   public
router.get('/users', userController.allUsers);

// @route    GET /user/:userId
// @desc     Get a single user
// @access   Protected
router.get('/user/:userId', requireSignin, userController.getUser);

// @route    GET /user/photo/:userId
// @desc     Get a user's photo
// @access   Public
router.get('/user/photo/:userId',userController.userPhoto);

// @route    PUT /user/:userId
// @desc     Update a user
// @access   Private
router.put('/user/:userId',requireSignin, userController.hasAuthorization, userController.updateUser);

// @route    DELETE /user/:userId
// @desc     Delete a user
// @access   Private
router.delete('/user/:userId',requireSignin, userController.hasAuthorization, userController.deleteUser);

// @route    GET /user/findpeople/:userId
// @desc     Suggest People
// @access   Private
router.get("/user/findpeople/:userId", requireSignin, userController.findPeople);

// any route containing userID param our program will first run this function
router.param("userId", userController.userById)

module.exports = router;
