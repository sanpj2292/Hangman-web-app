const router = new require('express').Router();
const passport = require('passport');

const googleAuthenticate = passport.authenticate('google', {
    session: true, 
    failureRedirect: '/api/auth/google/failure',
});

router.get('/google/', googleAuthenticate);

router.get('/google/callback', googleAuthenticate, (req, res) => {
    res.redirect(`http://localhost:3000/league`);
});

router.get('/google/failure', (req, res) => {
    res.redirect(`http://localhost:3000/login`);
});

router.get('/google/logout', (req, res) => {
    req.logout();
    res.redirect(`http://localhost:3000/`);
});

router.get('/login', (req, res) => {
    if (req.user) {
        res.status(200).json({
            user: req.user,
            isAuthenticated: req.isAuthenticated(),
            success: true,
            message: 'Login Successful',
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Login un-successful, req doesn\'t contain user object',
        });
    }
});

module.exports = router;
