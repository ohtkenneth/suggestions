const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleKeys = require('./keys').google;

passport.use(
  new GoogleStrategy({
    // options for google strat
    clientID: googleKeys.clientID,
    clientSecret: googleKeys.clientSecret,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  }, (accessToken, refreshToken, profile, cb) => {
    // passport cb 
    console.log('COMING FROM PASSPORT CONFIG');
    console.log("accessToken: " + accessToken);
    console.log("refreshToken: " + refreshToken);
    console.log("profile: " + profile);
    console.log("cb: " + cb);
    cb(accessToken, profile);
  })
);