const router = new require('express').Router();

const wordDetails = require('../service/word-details');
const auth = require('../service/auth');

const authCheck = (req, res, next) => {
    if (!req.user) {
        console.log('User not available')
    //   res.status(401).json({
    //     authenticated: false,
    //     message: "user has not been authenticated"
    //   });
    } else {
      next();
    }
};

router.use('/detail', authCheck, wordDetails);
router.use('/auth', auth);

module.exports = router;