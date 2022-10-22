// Core
const express = require('express');
const router = express.Router();

// Model
const Author = require('../../models/Author');

/**
 * Creates a new author
 * @route /authors
 */
router.post('/', (req, res) => {
  const newAuthor = new Author();
  newAuthor.name = req.body.name;
  newAuthor.email = req.body.email;
  newAuthor.save((err, author) => {
    err ? res.status(500).send({ err }) : res.send(author);
  });
});

/**
 * Retrieves list of authors
 * @route /authors
 */
router.get('/', (req, res) => {
  Author.find()
    .populate('posts', 'title date body')
    .then(authors => res.json(authors));
});

/**
 * Retrieves a single author.
 * @route /authors/{id}
 */
router.get('/:id', (req, res) => {
  Author.findOne({ _id: req.params.id })
    .populate('posts', 'title date')
    .exec((err, author) => {
      err
        ? res.status(500).send({ error: `Could not fetch author` })
        : res.send(author);
    });
});

/**
 * Updates an author.
 * @route /authors/{id}
 */
router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name, email: req.body.email } },
    { new: true },
    (err, author) => {
      err
        ? res.status(500).send({ error: `Could not update an author` })
        : res.send(`Success! Author is updated...`);
    }
  );
});

/**
 * Deletes an author.
 * @route /authors/{id}
 */
router.delete('/:id', (req, res) => {
  Author.findById(req.params.id)
    .then(author =>
      author.remove().then(() => res.json({ success: `Author is removed` }))
    )
    .catch(err =>
      res.status(500).json({ error: `Error: Unable to delete author` })
    );
});

module.exports = router;
