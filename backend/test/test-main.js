const { getWords, getWordDetails } = require("./test-utils");

const getMeaningPosForWord = async (word) => {
    try {
        const { meaning, pos } = await getWordDetails(word, 1);
        // success.push(word);
        // console.log(`${word} --- Success`)
        return {meaning, pos};
    } catch (error) {
        // failed.push(word);
        // console.log(`${word} --- Failure`);
        return {};
    }
};

async function* testGenFunction() {
    let i = 0;
    const words = await getWords();
    while(i < words.length) {
        let word = words[i];
        try {
            const {meaning, pos} = await getMeaningPosForWord(words[i]);
            i += 1;
            yield {word, status: (meaning && pos) ? true : false};
        } catch (error) {
            console.log(`${word}: Failure`);
            i += 1;
            yield {word, status: false};
        }
    }
}

const executeMain = async () => {
    const success = [], failure = [];
    let i = 0;
    for await (let {word, status: isSuccess} of testGenFunction()) {
        i++;
        if(isSuccess) {
            success.push(word);
        } else {
            failure.push(word);
        }
        console.log(`Word No:${i}, Success: ${success.length}, Failure: ${failure.length}`);
    }
    return {success, failure};
};

if (require.main === module) {

    executeMain().then(({success, failure}) => {
        console.log(`Total Number of Successful Words: ${success.length}`);
        console.log(failure);
    }).catch(e => console.error(e));

    
    // getWords().then(async words => {
    //     return words.map(async function (word, i) {
    //         const time = i > 0 ? 1000 : 0;
    //         setTimeout(await getWordDetails.bind(this, word), time);
    //     });
    // }).then(promises => {
    //     Promise.all(promises).then(() => {
    //         const result = `Result:
    //         Number of Words whose meaning could be fetched=${success.length}
    //         Number of Words whose meaning could not be fetched=${failed.length}
    //         Failed Words:
    //         ${failed.join(', ')}
    //         `;
    //         console.log(result);
    //     }).catch(e => console.error(e));
    // })
    // .catch(e => console.error(e));
}