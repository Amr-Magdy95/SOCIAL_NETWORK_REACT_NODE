const User = require('../models/user');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');


exports.userById = async (req, res, next, id) =>{
  const user = await User
    // populate followers and following
    .findById(id)
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec(
      (err, data)=>{
        if (!err){
          req.profile = data;
          next();
        }
      })



}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if(!authorized){
    res.status(403).json({
      error: "User is not authorized to perform this action"
    })
  }
  else{
    next();

  }
}

exports.allUsers = async (req, res) =>{
  await User.find().select("_id name email created updated").exec( (err, users)=>{
    if(err){
      res.status(400).json({
        error: err
      })
    }else{
      res.json(users)
    }
  })

}

exports.getUser = (req, res) =>{
  req.profile.password = undefined;
  return res.json(req.profile);
}

exports.userPhoto = (req, res, next) =>{
  if (req.profile.photo.data){
    res.setHeader("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next();
}

/*exports.updateUser = (req, res, next) =>{
  let user = req.profile
  user = _.extend(user, req.body)    // mutates the user object with req.body props
  user.updated = Date.now();
  user.save( err =>{
    if(err) res.status(400).json({
      error: "You are no authorized to perform this action"
    })
    else{
      user.password = undefined;
      res.json({user: user})
    }
  })

}*/

exports.updateUser = (req, res, next) =>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err){
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }else{
      // save user
      let user = req.profile;
      user = _.extend(user, fields)
      user.updated = Date.now()

      if (files.photo){
        user.photo.data = fs.readFileSync(files.photo.path)
        user.photo.contentType = files.photo.type
      }

      user.save( (err, result) => {
        if (err){
          return res.status(400).json({
            error: err
          })
        }else{
          res.json(user);
          next()
        }
      })
    }
  })
}

exports.deleteUser = async (req, res, next) =>{
  let user = req.profile;
  await user.remove((err, user) =>{
    if(err){
      return res.status(400).json({
        error: err
      })
    }else{
      res.json({
        message: "user has been deleted successully"
      })
    }
  })
}

// follow
exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId} }, (err, result) => {
    if(err){
      return res.status(400).json({ error: err})
    }
    next()
  })
}

exports.addFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId} }, { new: true})
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec( (err, result)=>{
        if(err){
          return res.status(400).json({ error: err})
        }
        res.json(result)
      })
}

// unfollow
exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.followId} }, (err, result) => {
    if(err){
      return res.status(400).json({ error: err})
    }
    next()
  })
}

exports.removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, { $pull: { followers: req.body.userId} }, { new: true})
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec( (err, result)=>{
        if(err){
          return res.status(400).json({ error: err})
        }
        res.json(result)
      })
}

exports.findPeople = (req, res) =>{
  let following = req.profile.following
  console.log('here', req.profile)
  following.push(req.profile._id)
  User.find({_id: {$nin: following}}, (err, users) =>{
    if(err){
      return res.status(400).json({error: err})
    }else{
      res.json(users)
    }
  }).select("_id name");
}
