import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContextProvider from "./contexts/context-provider";
import * as serviceWorker from './serviceWorker';
import Navbar from "./components/styled/styled-navbar";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <AppContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AppContextProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
