const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('../config/passportConfig');

/* own modules */
const router = require('./router');
// const loggerMiddleware = require('./loggerMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
// app.use(loggerMiddleware);
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  isAuthenticated: false,
}));

// OAUTH ROUTES
app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile']}))
app.get('/api/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  }
)

app.use('/', router);

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
  res.redirect('/');
});

app.listen(PORT, () => console.log('Suggestions server listening on ' + PORT));