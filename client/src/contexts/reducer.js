import { getInitKeysMap } from "./context-util";
import { GENERATE, WRONG, RIGHT, WIN, LOSS, ALERT, 
        DISMISS_ALERT, RELOAD, TOGGLE_MSG_ALERT,
        SET_PLAYER_GRID_API_REF, SELECT_TEAM_PLAYERS, 
        TOGGLE_GRID_LOADING, LOGIN_SUCCESS, LOGOUT} from "./action-types";

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
    gridLoading: false,
    team1: {
        batsmen: [],
        bowlers: []
    },
    team2: {
        batsmen: [],
        bowlers: []
    },
    isAuthenticated: false
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
                    type: action.actionType,
                    message: action.message
                }
            };
        case TOGGLE_GRID_LOADING:
            const { gridLoading } = action;
            return {
                ...state,
                gridLoading
            };
        case SELECT_TEAM_PLAYERS:
            const { team, typeOfPlayers, players } = action;
            const {team1, team2} = state;
            let clone = {};
            if (team === 'team1') {
                clone = Object.assign({}, {team1});
            } else if (team === 'team2') {
                clone = Object.assign({}, {team2});
            }
            if (typeOfPlayers === 'batsmen' && clone[team][typeOfPlayers].length < 3) {
                clone[team][typeOfPlayers] = [...clone[team][typeOfPlayers], ...players];
            } else {
                clone[team][typeOfPlayers] = players;
            }
            return {
                ...state,
                ...clone
            };
        case LOGOUT:
        case LOGIN_SUCCESS:
            const {isAuthenticated} = action;
            return {
                ...state,
                messageAlert: {
                    open: action.open,
                    type: action.actionType,
                    message: action.message
                },
                isAuthenticated,
            };
        default:
            return state;
    }
};

export default gameReducer;