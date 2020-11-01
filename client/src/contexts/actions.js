import { initializeDisplayWord } from "./context-util";
import { GENERATE, RIGHT, WRONG, WIN, LOSS, ALERT, DISMISS_ALERT, RELOAD, TOGGLE_MSG_ALERT, 
        TOGGLE_GRID_LOADING, SET_PLAYER_GRID_API_REF, SELECT_TEAM_PLAYERS } from "./action-types";

const wordGenerationUtil = (actionType, wordMeanPOS) => {
    const { word, meaning, pos } = wordMeanPOS;
    const displayWord = initializeDisplayWord(word);
    const attempts = word.length + 2;
    const totalAttempts = word.length + 2;

    return {
        type: actionType,
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
    }
}

export const generateAction = (wordMeanPOS) => {
    return wordGenerationUtil(GENERATE, wordMeanPOS);
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

export const reloadAction = () => ({
    type: RELOAD
})

export const toggleMsgAlert = ({message, actionType, open}) => ({
    type: TOGGLE_MSG_ALERT,
    actionType,
    message,
    open
});

export const toggleGridLoading = (gridLoading=false) => ({
    type: TOGGLE_GRID_LOADING,
    gridLoading
});

export const selectTeamPlayers = (team, typeOfPlayers, players) => ({
    type: SELECT_TEAM_PLAYERS,
    team, typeOfPlayers, players
});