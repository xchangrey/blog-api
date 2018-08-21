const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routers
const authors = require('./routes/api/author');
const posts = require('./routes/api/post');

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

//CORS

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
})

// Use Routes
app.use('/authors', authors);
app.use('/posts', posts);

//Connect to the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Blog API is started at port ${port}`));

