import React, { createContext, useState, useEffect } from 'react';
import { setWrongKey, getInitKeysMap, setRightKey, initializeDisplayWord, replaceWithMatchingChar } from './context-util';
import axios from 'axios';

const INIT_KEYS_MAP = getInitKeysMap();

export const AppContext = createContext({
    keys: INIT_KEYS_MAP,
    displayWord: null,
    details: {
        word: '',
        meaning: '',
        pos: ''
    },
    loading: true
});

const AppContextProvider = ({ children }) => {
    const [keys, setKeys] = useState(INIT_KEYS_MAP);
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({
        word: '',
        meaning: '',
        pos: ''
    });
    const [displayWord, setDisplayWord] = useState('');

    const { word } = details;

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

    useEffect(() => {
        async function getWordMeanPOS() {
            try {
                const response = await axios.get('/api/detail/collins/generate');
                const wordMeanPos = response.data;
                console.log('I have come after response', wordMeanPos);
                // set into context
                setDetails({ ...wordMeanPos });
                setLoading(false);
            } catch (error) {
                throw new Error(error.stack);
            }
        }
        getWordMeanPOS()
    }, []);

    // when word changes
    useEffect(() => {
        // After getting word
        setDisplayWord(initializeDisplayWord(word));
    }, [word]);

    return (
        <AppContext.Provider value={{ keys, wrongKey, rightKey, displayWord, checkAndSetChar, setDetails, details, setDisplayWord, loading, setLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;