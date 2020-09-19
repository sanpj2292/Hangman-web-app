
// const { describe, test, expect, beforeAll } = require("@jest/globals");
const { describe, it, before, test } = require('mocha')
const { getWords, getWordDetails } = require('./test-utils');
const expect = require('expect.js');
// jest.setTimeout(30000);

// describe('Words Check', () => {
//     getWords().then(words => {
//         test.each(words)('%s', (word) => {
//             expect(word.length).toBeGreaterThan(0);
//         });
//     });
    

// });
let words = [];
describe('Start with Words Test', function() {
    before(async function() {
        words = await getWords();
    });

    it('Testing for Words', async function() {
        const wordsPromises = words.map(word => {
            it(`${word} has meaning`, async function(done) {
                try {
                    console.log(word);
                    return await getWordDetails(word);
                } catch (error) {
                    done(error);
                }
            });
        });
        return Promise.all(wordsPromises).then(data => {
            const {meaning, pos, word} = data;
            console.log(`${word} has come into Promise.all()`);
            expect(meaning.length).to.be.greaterThan(0);
            expect(pos.length).to.be.greaterThan(0);
        });
    });
})
