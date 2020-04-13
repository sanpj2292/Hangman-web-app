import { getInitKeysMap } from "./context-util";
import { GENERATE, WRONG, RIGHT, WIN, LOSS, ALERT, DISMISS_ALERT } from "./action-types";

export const initialState = {
    keys: getInitKeysMap(),
    displayWord: '',
    attempts: 0,
    totalAttempts: 0,
    loading: true,
    details: {
        word: '',
        meaning: '',
        pos: ''
    },
    alert: {
        type: '',
        message: ''
    }
}
const gameReducer = (state, action) => {
    switch (action.type) {
        case RIGHT:
        case WRONG:
        case GENERATE:
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
                displayWord: 'Congratulations, You Won!!'
            };
        case LOSS:
            return {
                ...state,
                displayWord: 'Sorry, you lost the game!!',
                attempts: state.attempts > 0 ? state.attempts - 1 : state.attempts
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
        default:
            return state;
    }
};

export default gameReducer;