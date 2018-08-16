const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const post = new Schema({
  title: {
    type: String,
    default: 'I Am A Post'
  },
  body: String,
  author: {
    type: ObjectId,
    ref: 'Author',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type:Number,
    default: 0
  }
});


module.exports = mongoose.model('Post', post);