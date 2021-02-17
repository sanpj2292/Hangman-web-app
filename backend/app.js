const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('./routes/router');
const { getWordArray } = require('./service/utils');
const passport = require('passport');
const session = require('express-session');
const passportInit = require('./libs/passport-init');

const port = process.env.PORT || 3001;
const app = express();

app.use(cors(
    {
        credentials: true
    }
));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'bin/build')));
app.use(session({
    secret: process.env.FUNGAMERS_SESSION_SECRET,
    proxy: true,
    // name:'fungamersSession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60*1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passportInit();


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


module.exports = app;