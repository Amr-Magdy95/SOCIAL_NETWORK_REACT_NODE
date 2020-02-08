const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) =>{
  const userExists = await User.findOne({email: req.body.email});
  if(userExists){
    res.status(403).json({
      error: "User already exists"
    })
  }
  else{
    await User.create(req.body, (error, dataObj)=>{
      if(!error){
        res.json({
          message: "signup process is successful! please login to continue"
        })
      }
    })
  }
};

exports.signin = async (req, res) =>{
  // find the user based on email
  const {email, password} = req.body;
  const user = await User.findOne({email: email});
  if(!user){
    res.status(401).json({
      error: "User Does Not Exist"
    })
  }else{
    // if user is found make sure password matches
    // create comparePasswords in user model and use here
    const validPassword = await user.comparePasswords(password);
    if(!validPassword){
      res.status(401).json({
        error: "Invalid email or password"
      })
    }else{
      // generate a token with user id and secret
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET )
      // persist the token as 't' in the cookie -- added an expiration period
      res.cookie("t", token, {expire: new Date() + 9999})
      //return response with user and token to frontend client
      const {_id, name, email} = user;
      return res.json({token, user:{_id, name, email}});
    }
  }
};

exports.signout = async (req, res) =>{
  // to sign out all we need to do is to clear the cookie
  res.clearCookie("t");
  res.json({
    message: "signout successul"
  })
};
