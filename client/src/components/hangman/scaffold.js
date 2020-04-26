import React from "react";
import { AppContext } from "../../contexts/context-provider";
import "./scaffold.css";
import Hangman from "./hangman";

export default class HangmanScaffold extends React.Component {
    static contextType = AppContext;

    // An <SVG /> element. Defines the scaffolding we see on the main page. Defined only to reduce rendering time by setting
    // shouldComponentUpdate false for this element.

    // Props: None
    // State: None.

    // saves important re-rendering time when Parent has to update. This NEVER needs to change.
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    // 
    render() {
        const { finished, attempts, finishedWord } = this.context;
        console.log(`Scaffold: ${finished}`);
        console.log(this.context.attempts)
        const url = attempts > 0 ?
            'https://media.giphy.com/media/KH21ScGPuE7QDS1Y9I/source.gif' :
            'https://media.giphy.com/media/rKj0oXtnMQNwY/source.gif';
        const winOrLoss = attempts > 0 ? 'Win' : 'Loss';
        return (
            <div className='scaffold-container'>
                {!finished ? <svg className='svg-box'
                    version="1.1" viewBox="0 0 100 100" width='80%' height='80%' preserveAspectRatio="xMinYMin meet" >
                    <rect fill="#053544" width="2%" height="80%" x="4%" y="0" />
                    <rect fill="#053544" width="60%" height="2%" x="4%" y="0" />
                    <rect fill="#053544" width="60%" height="2%" x="0" y="80%" />
                    <line x1="58%" y1="0" x2="58%" y2="24%" stroke="rgb(0,0,0)" />
                    <Hangman />
                </svg> : <><img src={url} alt={winOrLoss} /> <p>{finishedWord}</p></>}
            </div>
        );
    }
};