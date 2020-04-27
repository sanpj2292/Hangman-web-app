import React, { useContext, useEffect } from 'react';
import './App.css';
import GameContainer from './components/styled/game-container';
import { generateAction } from './contexts/actions';
import Home from "./pages/home";
import { AppContext } from "./contexts/context-provider";

import { mountWithWordMeanPOS } from "./contexts/context-util";

function App() {

  const { dispatch, loading } = useContext(AppContext)

  // componentDidMount
  useEffect(() => {
    if (loading) {
      mountWithWordMeanPOS(dispatch, generateAction);
    }
  }, [loading]);

  return (
    <div className="container">
      <GameContainer >
        <Home />
      </GameContainer>
    </div>
  );
}

export default App;