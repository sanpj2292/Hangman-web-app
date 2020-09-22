const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('./routes/router');
const { getWordArray } = require('./service/utils');

const port = process.env.PORT || 3001;
const app = express();

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

app.use(cors(
    {
        credentials: true
    }
));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'bin/build')));

app.get('/', (req, res) => {
    res.send('We are Live with Express APP');
});

let words = [];

app.once('initialize', async () => {
    try {
        console.log('Initialization starts');
        words = await getWordArray(path.join(__dirname, 'words/word-list.txt'));
        app.emit('post-initialize');
    } catch (error) {
        throw new Error(error);
    }
});


app.once('post-initialize', () => {
    console.log('Initialization complete');
    app.listen(port, () => {
        console.log(`You can start the server at http://localhost:${port}`);
    });
});


app.emit('initialize');

// Custom Middleware
app.use((req, res, next) => {
    console.log('Middleware called');
    req.words = words;
    console.log('Middleware ends');
    next();
});


app.use('/api', router);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_KEY,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    console.log('Callback called -- inside passport callback');
    return done(null, { profile });
}));

app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
    session: false
}), (req, res) => {
    res.redirect(`http://localhost:3000/`);
});

app.get('auth/google/failure', (req, res) => {
    res.redirect(`http://localhost:3000/login`);
});

module.exports = app;