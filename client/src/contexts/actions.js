import { initializeDisplayWord } from "./context-util";
import { GENERATE, RIGHT, WRONG, WIN, LOSS, ALERT, DISMISS_ALERT } from "./action-types";

export const generateAction = (wordMeanPOS) => {
    const { word, meaning, pos } = wordMeanPOS;
    const displayWord = initializeDisplayWord(word);
    const attempts = word.length + 2;
    const totalAttempts = word.length + 2;

    return {
        type: GENERATE,
        payload: {
            details: {
                word,
                meaning,
                pos
            },
            displayWord,
            attempts,
            totalAttempts,
            loading: false
        }
    };
};


export const rightAction = (keys, displayWord) => {
    return {
        type: RIGHT,
        payload: {
            keys,
            displayWord
        }
    };
};

export const wrongAction = (keys, attempts) => ({
    type: WRONG,
    payload: {
        keys,
        attempts
    }
});

export const winAction = () => ({
    type: WIN
});

export const lossAction = () => ({
    type: LOSS
});

export const alertAction = ({ type, message }) => ({
    type: ALERT,
    payload: {
        type,
        message
    }
});

export const dismissAlertAction = () => ({
    type: DISMISS_ALERT
});