import React, { useContext, useLayoutEffect } from 'react';
import './App.css';
import GameContainer from './components/styled/game-container';
import { generateAction } from './contexts/actions';
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
      .catch(e => console.error(e));
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