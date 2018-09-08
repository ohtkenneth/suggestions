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
const PORT = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));
app.use(morgan('dev'));

// encrypts and sets cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
  res.redirect('/');
});

app.listen(PORT, () => console.log('Suggestions server listening on ' + PORT));