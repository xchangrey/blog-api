const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const author = new Schema({
  name: {
    type: String,
    default: 'Blogger'
  },
  email: String,
  follower: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }]
});

module.exports = mongoose.model('Author', author);