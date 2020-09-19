import React, { useContext } from 'react';
import './App.css';
import Home from "./pages/home";
import { AppContext } from "./contexts/context-provider";
import { Switch, Route } from "react-router-dom";

import LoginInput from './pages/login';
import GameContainer from './components/styled/game-container';

function App() {

  const VocabuilderComponent = () => <GameContainer><Home /></GameContainer>;

  return (
    <div className="container">
      <Switch>
        <Route exact component={VocabuilderComponent} path='/' />
        <Route exact path='/login' component={LoginInput}></Route>
      </Switch>
    </div>
  );
}

export default App;