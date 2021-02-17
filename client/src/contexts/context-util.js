import axios from 'axios';
import { alertAction } from "./actions";

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

async function getWordMeanPOS() {
    try {
        const response = await axios.get('/api/detail/collins/generate');
        return response.data;
    } catch (error) {
        throw new Error(error.stack);
    }
};

export function mountWithWordMeanPOS(dispatch, action) {
    return getWordMeanPOS()
        .then(wordMeanPos => {
            dispatch(action(wordMeanPos));
        })
        .catch(e => {
            dispatch(
                alertAction({
                    type: 'danger',
                    message: e.message
                })
            );
        });
};

export async function getPlayers(playerName, selectedIds) {
    try {
        let resp = {};
        const requestBody = {};
        if (selectedIds && selectedIds.length > 0) {
            requestBody.selectedIds = selectedIds.map(id => `${id}`);
        }
        if (!playerName) {
            resp = await axios.post('/api/league/players', requestBody);
        } else {
            resp = await axios.post('/api/league/players', {playerName, ...requestBody});
        }
        const {data: players} = resp.data;
        if (players && players.length > 0)
            return players;
        else if (players && players.length === 0)
            throw `Players are not available for the filter '${playerName}'`;
        else
            throw 'Something wrong with Request';
    } catch (error) {
        throw new Error(error);
    }
};

export async function login () {
    try {
        const resp = await axios.get('/api/auth/login');
        if (resp.status === 200) {
            return resp.data;
        } else {
            throw new Error(resp.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
}