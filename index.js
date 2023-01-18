const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const { User } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res, next) => {
  try {
    res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password

app.post('/register', async (req, res, next) => {
  let passwordHashed = await bcrypt.hash(req.body.password, 5);
  let user  = await User.create({username: req.body.username, password: passwordHashed});
  res.send(user);
})

// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB

app.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  let foundUser = await User.findOne({where :{username}});

    if(foundUser){
      isCorrectUser = await bcrypt.compare(password, foundUser.password);
      res.send(isCorrectUser);
    } else {
      res.send('User not found');
    }
})


// we export the app, not listening in here, so that we can run tests
module.exports = app;
