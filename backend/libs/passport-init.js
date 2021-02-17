const passport = require('passport');
const { getGoogleStrategy } = require('../service/utils');

module.exports = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) =>  cb(null, user));
  passport.deserializeUser((obj, cb) =>  cb(null, obj));
  
  // The function that is called when an OAuth provider sends back user 
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)

  // Adding each OAuth provider's strategy to passport
  passport.use(getGoogleStrategy('/api/auth/google/callback'));
}