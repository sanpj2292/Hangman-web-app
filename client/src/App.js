import React, { useContext, useLayoutEffect } from 'react';
import './App.css';
import GameContainer from './components/styled/game-container';
import { generateAction, alertAction } from './contexts/actions';
import Home from "./pages/home";
import { AppContext } from "./contexts/context-provider";

import {
  getWordMeanPOS
} from "./contexts/context-util";

function App() {

  const { dispatch } = useContext(AppContext)

  // componentDidMount
  useLayoutEffect(() => {
    getWordMeanPOS()
      .then(wordMeanPos => {
        dispatch(generateAction(wordMeanPos))
      })
      .catch(e => {
        dispatch(
          alertAction({
            type: 'danger',
            message: e.message
          })
        );
      });
  }, []);

  return (
    <div className="container">
      <GameContainer >
        <Home />
      </GameContainer>
    </div>
  );
}

export default App;