
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

    it('Testing for Words', function() {
        words.forEach(word => {
            it(`${word} has meaning`, async function(done) {
                try {
                    console.log(word);
                    const {meaning, pos} = await getWordDetails(word);
                    expect(meaning.length).to.be.greaterThan(0);
                    expect(pos.length).to.be.greaterThan(0);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });
})
