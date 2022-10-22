// Core
const express = require('express');
const router = express.Router();

//Model
const Post = require('../../models/Post');

/**
 * Creates a new post.
 * @route /posts
 */
router.post('/', (req, res) => {
  const { title, body, author } = req.body;
  const newPost = new Post();

  newPost.title = title;
  newPost.body = body;
  newPost.author = author;
  newPost.save((err, post) => {
    err
      ? res.status(500).send({ error: `Could not save post` })
      : res.send(post);
  });
});

/**
 * Retrieves all posts.
 * @route /posts
 */
router.get('/', (req, res) => {
  Post.find()
    .populate('author', 'name email')
    .exec((err, posts) => {
      err
        ? res.status(500).send({ error: `Could not fetch posts` })
        : res.send(posts);
    });
});

/**
 * Retrieves a single post.
 * @route /posts/{id}
 */
router.get('/:id', (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate('author', 'name email')
    .exec((err, post) => {
      err
        ? res.status(500).send({ error: `Could not fetch posts` })
        : res.send(post);
    });
});

/**
 * Updates a single post.
 * @route /posts/{id}
 */
router.put('/:id', (req, res) => {
  Post.findById({ _id: req.params.id }, (err, post) => {
    if (err) return err;
    
    post.title = req.body.title;
    post.body = req.body.body;
    post.save((err, updatedPost) => {
      err
        ? res.status(500).send({ error: `Could not update post` })
        : res.send(`Success! Post ${updatedPost.title} is Updated`);
    });
  });
});

/**
 * Deletes a post.
 * @route /posts/{id}
 */
router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post =>
      post.remove().then(() => res.json({ success: `Post is removed` }))
    )
    .catch(err =>
      res.status(500).json({ error: `Error: Unable to delete Post` })
    );
});

module.exports = router;
