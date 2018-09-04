const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

/* own modules */
const router = require('./router');
const loggerMiddleware = require('./loggerMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(loggerMiddleware);
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  isAuthenticated: false,
}));
app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.use('/', router);

app.listen(PORT, () => console.log('Suggestions server listening on ' + PORT));