const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const axios = require('axios');

const fs = require('fs');
const eol = require('os').EOL;

const getTextFromSpan = (htmlArray) => htmlArray.map(html => {
    const $ = cheerio.load(html);
    return $('span').text();
});

const getCollinsDicPOSMeaningContent = async (inputWord, retrialLimit) => {
    const url = `https://www.collinsdictionary.com/dictionary/english/${inputWord}`;
    console.log(`Retrying to fetch data.... ${retrialLimit}`);
    try {
        const axRes = await axios.get(url);
        const lastInd = axRes.request.path.lastIndexOf('/');
        const newWord = axRes.request.path.slice(lastInd + 1);
        let word = inputWord;
        if (inputWord !== newWord) {
            word = newWord;
        }
        const resHtml = axRes.data;
        const $ = cheerio.load(resHtml);

        const id = $('div[data-type-block="English"]').attr('id')

        const pos = $(`#${id} div[class="hom"]:first-child > span:first-child`)
            .text();
        const meaning = $(`#${id} div[class="hom"]:first-child div[class~=def]:first-of-type`)
            .text().split('\n').reduce((ac, s) => {
                ac += ` ${s.trim()}`;
                return ac;
            }, '').trim();

        if (retrialLimit <= 0) throw new Error('Retiral Limits Exceeded');
        return { word, pos, meaning };
    } catch (error) {
        if (retrialLimit <= 0) throw new Error(error);
        return getCollinsDicPOSMeaningContent(inputWord,
            retrialLimit - 1);
    }

}

const getGooglePOSMeaningsContent = async (word, retrialLimit) => {
    const url = `https://www.google.com/search?query=${encodeURIComponent(`${word} meaning`)}`;
    try {
        const browserPage = await puppeteer.launch().then(browser => browser.newPage());
        await browserPage.goto(url);
        return await browserPage.content();
    } catch (error) {
        if (retrialLimit === 0) throw new Error(error.stack);
        console.log(`Attempt Number: ${retiralLimit} --- Retrying... ${url}`);
        return getGooglePOSMeaningsContent(word, retrialLimit - 1);
    }
}

const Random = {
    lastNum: -1,
    currentNum: -1,
    random(maxVal) {
        let { lastNum, currentNum } = this;
        while (lastNum == currentNum) {
            currentNum = Math.floor((Math.random() * maxVal) + 1);
        }
        this.currentNum = currentNum;
    }
}

async function formArray(readable) {
    let prev = '';
    let lineArray = [];
    for await (const chunk of readable) {
        prev = chunk;
        while (true) {
            const eolInd = prev.indexOf(eol);
            if (eolInd < 1) break
            const line = prev.slice(1, eolInd);
            if (line.length >= 3) {
                lineArray.push(line);
            }
            prev = prev.slice(eolInd + 1);
        }
    }
    // To Include the final word in the text file
    if (prev.length > 0) {
        lineArray.push(prev);
    }
    return lineArray;
}
async function getWordArray(filepath) {
    const readable = fs.createReadStream(filepath,
        { encoding: 'utf-8' });
    const someArray = await formArray(readable);
    return someArray;
}

function generateWord(words, minLength) {
    while (Random.lastNum === Random.currentNum) {
        Random.random(words.length - 1);
    }
    Random.lastNum = Random.currentNum;
    if (words[Random.currentNum].length < minLength) {
        return generateWord(words, minLength);
    }
    return words[Random.currentNum];
}


module.exports = {
    getTextFromSpan,
    getGooglePOSMeaningsContent,
    Random,
    generateWord,
    getWordArray,
    getCollinsDicPOSMeaningContent
};
// To call this class from Nodejs Command Prompt
if (require.main === module) {
    // getWordArray().then(res => {
    //     console.log(res);
    // }).catch(e => console.log(e));
    getCollinsDicPOSMeaningContent('abacas', 3).then(res => {
        console.log({ ...res });
    }).catch(e => console.error(e));
    getCollinsDicPOSMeaningContent('happy', 3).then(res => {
        console.log({ ...res });
    }).catch(e => console.error(e));
    getCollinsDicPOSMeaningContent('chorister', 3).then(res => {
        console.log({ ...res });
    }).catch(e => console.error(e));

}