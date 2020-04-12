const router = new require('express').Router();
const { getTextFromSpan, getGooglePOSMeaningsContent, Random, generateWord,
    getCollinsDicPOSMeaningContent } = require('./utils');


async function getWordMeaningPos(words, trialCount) {
    console.log(`Attempt Trial count: ${trialCount}`);
    while (Random.lastNum === Random.currentNum) {
        Random.random(words.length - 1);
    }
    Random.lastNum = Random.currentNum;
    try {
        if (trialCount > 0) {
            const ind = Random.currentNum;
            const word = words[ind];

            const content = await getGooglePOSMeaningsContent(word, 3);
            const regex_POS = /<div class=\"pgRvse vdBwhd\"><i><span>([\s\S]*?)<\/span><\/i><\/div>/g;
            const regex_MEAN = /<div style=\"display:inline\" data-dobid=\"dfn\"><span>([\s\S]*?)<\/span><\/div>/gi;

            const posHtmlArray = content.match(regex_POS);
            const meanHtmlArray = content.match(regex_MEAN);
            const meanings = getTextFromSpan(meanHtmlArray);
            const partsOfSpeech = getTextFromSpan(posHtmlArray);
            if (word.length < 5) {
                return await getWordMeaningPos(words, trialCount - 1);
            }

            return { word, meanings, partsOfSpeech };
        } else {
            return {};
        }
    } catch (error) {
        if (trialCount > 0) {
            return await getWordMeaningPos(words, trialCount - 1);
        } else {
            return error;
        }
    }
}

router.get('/', async (req, res) => {
    const wordMeanPos = await getWordMeaningPos(req.words, 100);
    res.status(200).send({ ...wordMeanPos });
});

async function getWordMeaningPOSFromCollins(words) {
    try {
        const genWord = generateWord(words, 4);
        const wordMeanPos = await getCollinsDicPOSMeaningContent(genWord, 2);
        const { meaning, pos } = wordMeanPos;
        if (meaning.length === 0 || pos.length === 0) {
            return getWordMeaningPOSFromCollins(words)
        }
        return { ...wordMeanPos };
    } catch (error) {
        throw new Error(error.message);
    }
}

router.get('/collins/generate', async (req, res) => {
    try {
        const wordObj = await getWordMeaningPOSFromCollins(req.words);
        return res.status(200).send({ ...wordObj });
    } catch (error) {
        return res.status(500).send(new Error('Could not generate the word'));
    }
});

module.exports = router;