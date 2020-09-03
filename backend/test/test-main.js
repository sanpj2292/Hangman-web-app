const { getWords, getWordDetails } = require("./test-utils");

if (require.main === module) {
    const success = [],
        failed = [];
    getWords().then(async words => {
        return words.map(async word => {
            try {
                const { meaning, pos } = await getWordDetails(word);
                success.push(word);
                console.log(`${word} --- Success`)
                return {meaning, pos};
            } catch (error) {
                failed.push(word);
                console.log(`${word} --- Failure`);
                return {};
            }
        });
    }).then(promises => {
        Promise.all(promises).then(() => {
            const result = `Result:
            Number of Words whose meaning could be fetched=${success.length}
            Number of Words whose meaning could not be fetched=${failed.length}
            Failed Words:
            ${failed.join(', ')}
            `;
            console.log(result);
        }).catch(e => console.error(e));
    })
    .catch(e => console.error(e));
}