const passport = require('passport');// const GoogleStrategy = require('passport-google-oauth20');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const googleKeys = require('./keys').google;
const { getUser, findOrCreateGoogleUser, findGoogleUserById, findUserById } = require('../db/dbHelpers'); 

// create cookie session
passport.serializeUser((user, done) => {
  console.log('serializing...')
  // done(null, user.id);
  const options = { id: user.id };
  // check for account type for db collectin lookup
  if (user.googleId) {
    options.type = 'google';
  } else {
    options.type = 'local';
  }
  // cookie created; pass to deserialization
  done(null, options);
});

passport.deserializeUser((user, done) => {
  console.log('deserializing...', user);
  // find user with id on cookie
  if (user.type === 'google') {
    findGoogleUser(user.id)
      .then(result => {
        done(null, result);
      });
  } else {
    findUserById(user.id)
      .then(result => {
        done(null, result);
      });
  }
});

passport.use(new LocalStrategy(
  // specify properties to grab from request body
  {
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    console.log(email, password)
    // retrieve user from db
    getUser({ email, password })
      .then(results => {
        console.log('LOCAL RESULTS', results);
        // pass user to serialize to create cookie session
        done(null, results);
      })
      .catch(err => {
        if (err === 'invalid') {
          done(null, false, { message: 'Incorrect password or email.' });
        } else {
          throw err;
        }
      });
  }
));

passport.use(
  new GoogleStrategy({
    // options for google strat
    clientID: googleKeys.clientID,
    clientSecret: googleKeys.clientSecret,
    callbackURL: '/api/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    // find google user
    processGoogleLogin(profile.id)
      .then(result => {
        done(null, result.googleUser);
      });
  })
);


async function processGoogleLogin(googleId) {
  try {
    const result = await findOrCreateGoogleUser(googleId);
    return result;
  } catch(err) {
    console.log(err);
  }
}

async function findGoogleUser(id) {
  try {
    const result = await findGoogleUserById(id);
    return result;
  } catch(err) {
    console.log('ERROR FROM FIND ONE', err);
  };
};