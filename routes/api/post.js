const express = require("express");
const router = express.Router();

//Models
const Author = require("../../models/Author");
const Post = require("../../models/Post");

// @route   POST /posts
// @desc    Create A Post
// @access  Public

router.post('/', (req,res) => {
  const newPost = new Post();
  newPost.title = req.body.title;
  newPost.body = req.body.body;
  newPost.author = req.body.author;
  newPost.save((err, post) => {
    err ? res.status(500).send(({error: `Could not save post`})) : res.send(post);
  });
});

// @route   GET /posts/id
// @desc    GET All Posts
// @access  Public

router.get('/', (req, res) => {
  Post.find()
    .populate('author', 'name email')
    .exec((err, posts) => {
      err ? res.status(500).send({error: `Could not fetch posts`}) : res.send(posts);
    });
});


// @route   GET /posts/id
// @desc    GET All Posts
// @access  Public

router.get('/:id', (req, res) => {
  Post.findOne({_id: req.params.id})
    .populate('author', 'name email')
    .exec((err, post) => {
      err ? res.status(500).send({ error: `Could not fetch posts` }) : res.send(post);
    });
});


// @route   PUT /posts/id
// @desc    Edit A Post
// @access  Public

router.put('/:id', (req, res) => {
  Post.findById({_id: req.params.id}, (err, post) => {
    if(err) return handleError(err);
    post.title = req.body.title;
    post.body = req.body.body;
    post.save((err, updatedPost) => {
      err ? res.status(500).send({error: `Could not update post`}) : res.send(`Success! Post is Updated`);
    });
  });
});

// @route   DELETE /authors
// @desc    Delete an Author
// @access  Public

router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: `Post is removed` })))
    .catch(err => res.status(500).json({ error: `Error: Unable to delete Post` }))
});

module.exports = router;
