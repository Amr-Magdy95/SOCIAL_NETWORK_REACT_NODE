const Post = require('../models/post.js');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.postById = async(req, res, next, id) =>{
  Post.findById(id)
      .exec( (err, post)=>{
        if( err){
          return res.status(400).json({
            error: err
          })
          next();
        }else{

          req.post = post;


        }
        next();

  })
}

exports.isPoster = (req, res, next) =>{
  const isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if(isPoster){
    next()

  }else{
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
}

exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove( (err, post) =>{
    if(err){
      return res.status(400).json({
        error: err
      })
    }else{
      res.json({
        message: "successfuly deleted the post"
      })
    }
  })
}

exports.updatePost = (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now;
  post.save( (err) => {
    if(err){
      return res.status(400).json({
        error:err
      })
    }else{
      res.json(post)

    }
  });

}

exports.getPosts = (req, res) => {
  const posts = Post.find()
  .populate("postedBy", "_id name")
  .select("_id title body")
  .then((posts) => res.status(200).json({posts: posts}) )
  .catch(err => console.log(err));

}

exports.createPost = (req, res, next) =>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) =>{
      if(err){
        res.json({
          error: "Image could not be loaded"
        })
      }else{
        let post = new Post(fields);
        req.profile.password= undefined;
        post.postedBy = req.profile;
        if( files.photo ){
          post.photo.data= fs.readFileSync(files.photo.path);
          post.photo.contentType = files.photo.type;
        }
        post.save( (err, result)=>{
          if(err){
            console.log('here')
            return res.status(400).json({
              error: err
            })
          }else{
            res.json(result);
          }
        });

      }
  })
}

exports.postsByUser = (req, res) =>{
  Post.find({postedBy: req.profile._id})
      .populate("postedBy", "_id name")
      .sort("created")
      .exec( (err, posts)=>{
        if(err){
          return res.status(400).json({
            error: err
          })
        }else{
          return res.json(posts)
        }
      })
}
