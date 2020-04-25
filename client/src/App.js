import React, { useRef, useContext, useEffect } from 'react';
import './App.css';
import Keys from './components/keys/keys';
import DisplayWord from './components/display-word/display-word';
import WithSpinner from "./components/HOC/with-spinner";
import Attempts from './components/attempts/attempts';
import GameContainer from './components/styled/game-container';
import { winAction, rightAction, lossAction, dismissAlertAction, wrongAction, alertAction } from './contexts/actions';
import Alert from "./components/styled/alert";
import { AppContext } from "./contexts/context-provider";

import { replaceWithMatchingChar, setRightKey, setWrongKey } from "./contexts/context-util";

function App() {
  const { displayWord, details: { word }, attempts,
    keys, dispatch, alert: { type, message } } = useContext(AppContext);

  const containerRef = useRef();

  // componentDidMount
  useEffect(() => {
    // To set focus to the keys container when it loads initially
    containerRef.current.focus();
  }, [])

  const onKeyUpHandler = e => {
    const { key } = e;

    // if key has already been pressed
    if (keys[key] && keys[key].pressed) {
      return dispatch(
        alertAction({
          type: 'info',
          message: `KEY: '${key.toUpperCase()}' has already been pressed`
        })
      );
    }
    if (keys[key]) {
      let i = word.indexOf(key);
      if (i > -1) {
        const newKeys = setRightKey(keys, key);
        const newDisplayWord = replaceWithMatchingChar(displayWord, word, key);
        // Win condition
        if (newDisplayWord.toLowerCase() === word) {
          return dispatch(winAction());
        }
        // Not a win but right guess is rewarded
        return dispatch(rightAction(newKeys, newDisplayWord));
      }
      // Loss condition before wrongAction
      if (attempts <= 0) {
        e.stopPropagation();
        return dispatch(lossAction());
      }
      // Not a win/loss but wrong guess is being handled
      const newKeys = setWrongKey(keys, key);
      return dispatch(wrongAction(newKeys, attempts - 1));
    }
  }

  return (
    <div className="container">
      <GameContainer >
        <div className='d-flex flex-wrap justify-content-center align-items-center py-1'>
          {type && type.length > 0 ? <Alert {...{ type, message }} timeout={3000}
            onDismissAlert={() => dispatch(dismissAlertAction())} /> : null}
        </div>
        <Attempts />
        <div className='container d-flex flex-wrap justify-content-center pb-2'>
          <DisplayWord />
        </div>
        <div tabIndex={-1}
          ref={containerRef}
          className='key-container d-flex flex-wrap justify-content-center'
          onKeyUp={onKeyUpHandler}>
          <Keys keyList={Object.keys(keys)}></Keys>
        </div>
      </GameContainer>
    </div>
  );
}

export default WithSpinner(App);