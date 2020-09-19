const path = require('path');
const { getWordArray, getCollinsDicPOSMeaningContent } = require("../service/utils");

const getWords = async () => {
    const filepath = path.join(__dirname, '../words/word-list.txt');
    const words = await getWordArray(filepath);
    return words;
};

const getWordDetails = async (word, retries=3) => {
    const {meaning, pos} = await getCollinsDicPOSMeaningContent(word, retries);
    return {word, meaning, pos};
};

module.exports = {
    getWords,
    getWordDetails
};