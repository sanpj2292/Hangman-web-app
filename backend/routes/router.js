const router = new require('express').Router();

const wordDetails = require('../service/word-details');

router.use('/detail', wordDetails);

module.exports = router;