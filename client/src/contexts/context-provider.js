import React, { createContext, useReducer } from 'react';
import gameReducer, { initialState } from "./reducer";

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