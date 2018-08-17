const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

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

// Use Routes
app.use('/authors', authors);
app.use('/posts', posts);

// Serve Static assets if in production

if(process.env.NODE_ENV === 'production'){
  //Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Connect to the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Blog API is started at port ${port}`));

