import axios from 'axios';

export const setWrongKey = (keys, key) => {
    return {
        ...keys,
        [key]: {
            key,
            init: false,
            wrong: true,
            pressed: true
        }
    };
};

export const setRightKey = (keys, key) => {
    return {
        ...keys,
        [key]: {
            key,
            init: false,
            wrong: false,
            pressed: true
        }
    }
}

export const getInitKeysMap = () => 'qwertyuiopasdfghjklzxcvbnm'.split('')
    .reduce((acc, key) => {
        acc[key] = { key, wrong: false, init: true, pressed: false };
        return acc;
    }, {});

export const initializeDisplayWord = (word) => {
    return Array.from(word).reduce((acc, v) => `${acc}_`, '');
};

const getMatchIndexes = (word, char) => {
    let regex = new RegExp(`[${char}]`, 'g')
    let matchIndexes = [];
    while ((regex.exec(word)) !== null) {
        matchIndexes.push(regex.lastIndex - 1);
    }
    return matchIndexes;
}

export const replaceWithMatchingChar = (displayWord, refWord, char) => {
    const matchIndexes = getMatchIndexes(refWord, char);
    const _dispArr = Array.from(displayWord);
    matchIndexes.forEach(i => _dispArr[i] = char.toUpperCase());
    return _dispArr.join('');
}

export async function getWordMeanPOS() {
    try {
        const response = await axios.get('/api/detail/collins/generate');
        return response.data;
    } catch (error) {
        throw new Error(error.stack);
    }
};