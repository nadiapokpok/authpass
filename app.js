
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


//use EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//use Routes
app.use('/users', require('./route/users'));
app.use('/', require('./route/index'))



const PORT = process.env.PORT || 5002;
app.listen(PORT, console.log(`Hello je vous écoute sur port ${PORT}`));