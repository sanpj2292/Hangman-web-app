import React, { createContext, useReducer, useEffect } from 'react';
import gameReducer, { initialState } from "./reducer";
import axios from 'axios';
import { generateAction } from "./actions";

export const AppContext = createContext({
    ...initialState,
    dispatch: () => { }
});

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // componentDidMount
    useEffect(() => {
        async function getWordMeanPOS() {
            try {
                const response = await axios.get('/api/detail/collins/generate');
                const wordMeanPos = response.data;
                // set into context
                dispatch(generateAction(wordMeanPos));
            } catch (error) {
                throw new Error(error.stack);
            }
        }
        getWordMeanPOS()
    }, []);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;