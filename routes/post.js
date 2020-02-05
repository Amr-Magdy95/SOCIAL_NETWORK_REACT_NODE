const router = require('express').Router();
const postController = require('../controllers/post.js');

router.get('/', postController.getPosts);

module.exports = router;
