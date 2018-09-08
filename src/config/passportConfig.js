const passport = require('passport');// const GoogleStrategy = require('passport-google-oauth20');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const googleKeys = require('./keys').google;
const { getUser, findOrCreateGoogleUser, findGoogleUserById } = require('../db/dbHelpers'); 

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

passport.serializeUser((user, done) => {
  console.log('USER', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  findGoogleUser(id)
    .then(result => {
      done(null, result);
    });
});

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