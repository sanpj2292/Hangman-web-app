import React, { useContext, useEffect } from 'react';
import './App.css';
import Keys from './components/keys/keys';
import { AppContext } from './contexts/context-provider';
import DisplayWord from './components/display-word/display-word';

function App() {
  const { keys, displayWord, setWord, checkAndSetChar } = useContext(AppContext);

  // componentDidMount
  useEffect(() => {
    // Words API
    setTimeout(() => setWord('sankeerth'), 2000);
  }, [setWord])

  const onKeyUpHandler = e => {
    console.log(`Display Word Index: ${displayWord.indexOf(e.key)}`);
    console.log(`Condition: ${keys[e.key] && displayWord.indexOf(e.key) === -1}`)
    if (keys[e.key] && displayWord.indexOf(e.key) === -1) {
      checkAndSetChar(e.key);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='container'>
          <DisplayWord />
        </div>
        <div tabIndex={-1}
          className='key-container d-flex flex-wrap p-2 justify-content-start'
          onKeyUp={onKeyUpHandler}>
          <Keys keyList={Object.keys(keys)}></Keys>
        </div>
      </div>
    </div>
  );
}

export default App;
