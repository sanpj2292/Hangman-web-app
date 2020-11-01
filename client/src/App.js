import React, { useContext } from 'react';
import './App.css';
import Home from "./pages/home";
import { AppContext } from "./contexts/context-provider";
import { Switch, Route } from "react-router-dom";

import LoginInput from './pages/login';
import GameContainer from './components/styled/game-container';
import League from "./pages/league";
import { Paper } from "@material-ui/core";

function App() {

  const VocabuilderComponent = () => <div className='container'><GameContainer><Home /></GameContainer></div>;
  const LoginInputComponent = () => <div className='container'><GameContainer><LoginInput /></GameContainer></div>;
  const LeagueComponent = () => <div className='mx-2'><Paper className='mt-3 pb-2'><League /></Paper></div>;

  return (
      <Switch>
        <Route exact component={VocabuilderComponent} path='/' />
        <Route exact path='/login' component={LoginInputComponent}></Route>
        <Route exact path='/league' component={LeagueComponent}></Route>
      </Switch>
  );
}

export default App;