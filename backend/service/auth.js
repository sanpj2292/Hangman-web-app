const router = new require('express').Router();
const passport = require('passport');

const { getGoogleStrategy } = require('./utils');

passport.use(getGoogleStrategy('/api/auth/google/callback'));


router.get('/google/', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    session: false
}), (req, res) => {
    res.redirect(`http://localhost:3000/`);
});

router.get('/google/failure', (req, res) => {
    res.redirect(`http://localhost:3000/login`);
});

module.exports = router;
