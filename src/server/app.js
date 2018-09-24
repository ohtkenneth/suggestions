require('dotenv').config();
const config = require(path.resolve(__dirname, 'config'));

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

const passport = require('passport');
const passportConfig = require('../config/passportConfig');

/* own modules */
const router = require('./router');
const authRouter = require('./authRouter');
const keys = require('../config/keys');
// const loggerMiddleware = require('./loggerMiddleware');

const app = express();
const PORT = config.server.port;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));
// encrypts and sets cookie on client
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
// sets sesssion on 'req.user'
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
});
app.use('/api', router);
app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
