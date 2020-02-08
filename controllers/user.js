const User = require('../models/user');

exports.userById = async (req, res, next, id) =>{
  const user = await User.find({_id: id}).exec( (err, dataObj)=>{
    if( err || !user){}else{
      req.profile = user;
      next();
    }
  })
}

exports.hasAuthorization = (req, res, next) =>{
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
  if(!authorized){
    res.status(403).json({
      error: "User is not authorized to perform this action"
    })
  }
}
