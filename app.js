const express = require('express');          // returns a function
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

require('dotenv').config();                 // load env variables

// database connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then( ()=>{ console.log('DB connected');})

// bring in the routes                      // invoking this function returns an object
const postRoutes = require('./routes/post.js');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

// methods
app.use('/', postRoutes);

// server starts listening
const PORT = 8080;
app.listen(PORT, () =>{ console.log(`now listening on port: ${PORT}`); })
