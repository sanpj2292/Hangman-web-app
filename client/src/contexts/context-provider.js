import React, { createContext, useState, useEffect } from 'react';
import { setWrongKey, getInitKeysMap, setRightKey, initializeDisplayWord, replaceWithMatchingChar } from './context-util';

const INIT_KEYS_MAP = getInitKeysMap();

export const AppContext = createContext({
    keys: INIT_KEYS_MAP,
    displayWord: null
});

const AppContextProvider = ({ children }) => {
    const [keys, setKeys] = useState(INIT_KEYS_MAP);
    const [word, setWord] = useState('');
    const [displayWord, setDisplayWord] = useState('');

    const wrongKey = (key) => setKeys(setWrongKey(keys, key));
    const rightKey = (key) => setKeys(setRightKey(keys, key));

    const checkAndSetChar = (key) => {
        let i = word.indexOf(key)
        if (i > -1) {
            const newKeys = setRightKey(keys, key);
            const newDisplayWord = replaceWithMatchingChar(displayWord, word, key);
            setDisplayWord(newDisplayWord);
            setKeys(newKeys);
        } else {
            wrongKey(key);
        }
    }

    // when word changes
    useEffect(() => {
        // After getting word
        setDisplayWord(initializeDisplayWord(word));
    }, [word]);

    return (
        <AppContext.Provider value={{ keys, wrongKey, rightKey, displayWord, setWord, checkAndSetChar }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;