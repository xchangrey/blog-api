const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('Connected to Blog API DB...'))
  .catch(err => console.log(err));

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Models
const Author = require('./models/Author');
const Post = require('./models/Post');

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Blog API is started at port ${port}`));

