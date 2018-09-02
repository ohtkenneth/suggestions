const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy(
  {
    clientID: '1084742281511-f34rtlri38o5erd4puoks0u8pprvfh77.apps.googleusercontent.com',
    clientSecret: 'TIEOCA_7CvpLIoSB0vNZRvBY',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    })
  }
));

module.exports = passport;