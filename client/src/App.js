import React, { useContext } from 'react';
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

  const onKeyUpHandler = e => {
    const { key } = e;
    if (attempts <= 1) {
      e.stopPropagation();
      dispatch(lossAction());
    } else {
      if (keys[key] && displayWord.indexOf(key) === -1) {
        // if key has already been pressed
        if (keys[key].pressed) {
          dispatch(
            alertAction({
              type: 'info',
              message: `KEY:'${key.toUpperCase()}' has already been pressed`
            })
          );
        } else {
          let i = word.indexOf(key);
          if (i > -1) {
            const newKeys = setRightKey(keys, key);
            const newDisplayWord = replaceWithMatchingChar(displayWord, word, key);
            // Win condition
            if (newDisplayWord === word) {
              dispatch(winAction());
            } else {
              // Not a win but right guess is rewarded
              dispatch(rightAction(newKeys, newDisplayWord, attempts - 1));
            }
          } else {
            // Not a win/loss but wrong guess is being handled
            const newKeys = setWrongKey(keys, key);
            dispatch(wrongAction(newKeys, attempts - 1));
          }
        }
      }
    }
  }

  return (
    <div className="App">
      {type && type.length > 0 ? <Alert {...{ type, message }} timeout={3000}
        onDismissAlert={() => dispatch(dismissAlertAction())} /> : null}
      <GameContainer>
        <div className='ml-auto pb-2'>
          <Attempts />
        </div>
        <div className='container d-flex flex-wrap justify-content-center pb-2'>
          <DisplayWord />
        </div>
        <div tabIndex={-1}
          className='key-container d-flex flex-wrap justify-content-center'
          onKeyUp={onKeyUpHandler}>
          <Keys keyList={Object.keys(keys)}></Keys>
        </div>
      </GameContainer>
    </div>
  );
}

export default WithSpinner(App);