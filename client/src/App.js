import React, { useContext, useEffect } from 'react';
import './App.css';
import Keys from './components/keys/keys';
import { AppContext } from './contexts/context-provider';
import DisplayWord from './components/display-word/display-word';
import axios from "axios";

function App() {
  const { keys, displayWord, details, setDetails, checkAndSetChar } = useContext(AppContext);

  // componentDidMount
  useEffect(() => {
    // Words API
    async function getWordMeanPOS() {
      try {
        const response = await axios.get('/api/detail/collins/generate');
        const wordMeanPos = response.data;
        // set into context
        setDetails({ ...wordMeanPos });
      } catch (error) {
        throw new Error(error.stack);
      }
    }
    getWordMeanPOS()
  }, [setDetails])

  const onKeyUpHandler = e => {
    if (keys[e.key] && displayWord.indexOf(e.key) === -1) {
      checkAndSetChar(e.key);
    }
  }

  return (
    <div className="App">
      <div className='d-flex flex-wrap justify-content-center'>
        <div className='container d-flex flex-wrap justify-content-center'>
          <DisplayWord />
        </div>
        <div tabIndex={-1}
          className='key-container d-flex flex-wrap'
          onKeyUp={onKeyUpHandler}>
          <Keys keyList={Object.keys(keys)}></Keys>
        </div>
      </div>
    </div>
  );
}

export default App;
