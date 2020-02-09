const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type: String

  },
  body:{
    type: String
  },
  photo:{
    data: Buffer,
    contentType: String
  },
  postedBy:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
