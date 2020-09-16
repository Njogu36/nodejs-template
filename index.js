const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const app = express();

// Functions

const config = require('./config/keys.js')
require('./config/passport')(passport);

// Views

app.set('view engine', 'jade');
app.set('/views', './views');

// Form body-parser

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: true }));

// Static Files

app.use(express.static('public'));

// DB connection

mongoose.connect(config.Database);
const db = mongoose.connection;
db.once('open', () => {
  console.log('DB is running')
})
db.on('error', (err) => {
  console.log(err)
})

// Connect Flash

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })

}));

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Routes

const api = require('./routes/api.js');
const  user = require('./routes/user.js');
app.use('/api', api);
app.use('/', user);



// Port

app.listen(process.env.PORT || 5000, () => {
  console.log('running on port 5000')
})
















