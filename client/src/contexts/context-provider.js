import React, { createContext, useReducer, useEffect } from 'react';
import gameReducer, { initialState } from "./reducer";
import { getWordMeanPOS } from "./context-util";
import { generateAction } from "./actions";

export const AppContext = createContext({
    ...initialState,
    dispatch: () => { }
});

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;