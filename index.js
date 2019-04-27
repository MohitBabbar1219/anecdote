const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

require('./models/User');
require('./models/Blog');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
  .then(() => console.log('successfully connected to database...'))
  .catch(() => console.log('error occurred while connecting to database'));

app.use(passport.initialize());
require('./services/passport')(passport);

const users = require('./routes/users');
app.use('/api/users', users);
const blogs = require('./routes/blogs');
app.use('/api/blogs', blogs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));