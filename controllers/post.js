const Post = require('../models/post.js');

exports.getPosts = (req, res) => {
  const posts = Post.find().select("_id title body")
  .then((posts) => res.status(200).json({posts: posts}) )
  .catch(err => console.log(err));

}

exports.createPost = async (req, res) =>{
  await Post.create(req.body, (err, dataObj) =>{
    if(err){
      res.status(400).json({
        error: err
      })
    }
    const {_id, title, body} = dataObj;
    res.status(200).json({post: {_id, title, body} });
  });
}
