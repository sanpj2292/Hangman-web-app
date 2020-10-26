import { getInitKeysMap } from "./context-util";
import { GENERATE, WRONG, RIGHT, WIN, LOSS, ALERT, 
        DISMISS_ALERT, RELOAD, TOGGLE_MSG_ALERT,
        SET_PLAYER_GRID_API_REF } from "./action-types";

export const initialState = {
    keys: getInitKeysMap(),
    displayWord: '',
    attempts: 0,
    totalAttempts: 0,
    loading: true,
    finishedWord: '',
    finished: false,
    isWin: null,
    details: {
        word: '',
        meaning: '',
        pos: ''
    },
    alert: {
        type: '',
        message: ''
    },
    messageAlert: {
        type: '',
        message: '',
        open: false,
        position: 'bottom-right'
    }, 
}
const gameReducer = (state, action) => {
    switch (action.type) {
        case RIGHT:
        case WRONG:
            return {
                ...state,
                ...action.payload,
                alert: {
                    type: '',
                    message: ''
                }
            };
        case WIN:
            return {
                ...state,
                finishedWord: 'Congratulations, You Won!!',
                displayWord: state.details.word.toUpperCase(),
                isWin: true,
                finished: true
            };
        case LOSS:
            return {
                ...state,
                finishedWord: 'Sorry, you lost the game!!',
                displayWord: state.details.word.toUpperCase(),
                attempts: state.attempts > 0 ? state.attempts - 1 : state.attempts,
                isWin: false,
                finished: true
            };
        case ALERT:
            return {
                ...state,
                alert: { ...action.payload }
            };
        case DISMISS_ALERT:
            return {
                ...state,
                alert: {
                    ...initialState.alert
                }
            };
        case GENERATE:
            return {
                ...initialState,
                ...action.payload
            };
        case RELOAD:
            return {
                ...state,
                loading: true
            }
        case TOGGLE_MSG_ALERT:
            console.log(state.messageAlert);
            return {
                ...state,
                messageAlert: {
                    open: action.open,
                    type: action.actionType ? action.actionType:'warning',
                    message: action.message ? action.message:''
                }
            };
        default:
            return state;
    }
};

export default gameReducer;