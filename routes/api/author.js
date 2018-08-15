const express = require('express');
const router = express.Router();

//Models
const Author = require('../../models/Author');
const Post = require('../../models/Post');

// @route   POST /authors
// @desc    Create an Author
// @access  Public

router.post('/', (req,res) => {
  const newAuthor = new Author();
  newAuthor.name = req.body.name;
  newAuthor.email = req.body.email;
  newAuthor.save((err, author) => {
    err ? res.status(500).send({error: `Could not add author`}) : res.send(author);
  });
});

// @route   GET /authors
// @desc    Get All Authors
// @access  Public

router.get('/',(req,res) => {
  Author.find()
    .then(authors => res.json(authors));
});

// @route   GET /authors/id
// @desc    Get A Single Author
// @access  Public

router.get('/:id', (req,res) => {
  Author.findOne({_id: req.params.id})
  .populate('posts', 'title date')
  .exec((err, author) => {
    err ? res.status(500).send({ error: `Could not fetch author` }) : res.send(author);
  });
})

// @route   PUT /authors
// @desc    Edit an Author
// @access  Public

router.put('/:id', (req,res) => {
  Author.findByIdAndUpdate(
    req.params.id, 
    {$set:{name: req.body.name, email:req.body.email}},
    {new:true}, 
    (err, author) => {
    err ? res.status(500).send({error: `Could not update an author`}) : res.send(`Success! Author is updated...`);
  });
});

// @route   DELETE /authors
// @desc    Delete an Author
// @access  Public

router.delete('/:id', (req,res) => {
  Author.findById(req.params.id)
    .then(author => author.remove().then(() => res.json({success:`Author is removed`})))
    .catch(err => res.status(500).json({error: `Error: Unable to delete author`}))
});

module.exports = router;