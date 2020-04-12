import React, { useContext } from 'react';
import './App.css';
import Keys from './components/keys/keys';
import { AppContext } from './contexts/context-provider';
import DisplayWord from './components/display-word/display-word';
import WithSpinner from "./components/HOC/with-spinner";

function App() {
  const { keys, displayWord, checkAndSetChar } = useContext(AppContext);

  const onKeyUpHandler = e => {
    if (keys[e.key] && displayWord.indexOf(e.key) === -1) {
      checkAndSetChar(e.key);
    }
  }

  return (
    <div className="App">
      <div className='d-flex flex-wrap justify-content-center'>
        <div className='container d-flex flex-wrap justify-content-center pb-2'>
          <DisplayWord />
        </div>
        <div tabIndex={-1}
          className='key-container d-flex flex-wrap justify-content-center'
          onKeyUp={onKeyUpHandler}>
          <Keys keyList={Object.keys(keys)}></Keys>
        </div>
      </div>
    </div>
  );
}

export default WithSpinner(App);