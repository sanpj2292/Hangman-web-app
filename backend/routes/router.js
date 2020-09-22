const router = new require('express').Router();

const wordDetails = require('../service/word-details');
const auth = require('../service/auth');

router.use('/detail', wordDetails);
router.use('/auth', auth);

module.exports = router;