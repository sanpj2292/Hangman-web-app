import React, { useContext } from "react";
import { AppContext } from "../../contexts/context-provider";
import "./scaffold.css";
import Hangman from "./hangman";
import Status from '../styled/typography/container'

export default function HangmanScaffold() {
    const { finished, finishedWord, isWin } = useContext(AppContext);
    const url = isWin ?
        'https://media.giphy.com/media/KH21ScGPuE7QDS1Y9I/source.gif' :
        'https://media.giphy.com/media/rKj0oXtnMQNwY/source.gif';
    return (
        <div className='scaffold-container'>
            {!finished ? <svg className='svg-box'
                version="1.1" viewBox="0 0 100 100" width='100%' height='100%' preserveAspectRatio="xMinYMin meet" >
                <rect fill="#053544" width="2%" height="80%" x="4%" y="0" />
                <rect fill="#053544" width="60%" height="2%" x="4%" y="0" />
                <rect fill="#053544" width="60%" height="2%" x="0" y="80%" />
                <line x1="58%" y1="0" x2="58%" y2="24%" stroke="rgb(0,0,0)" />
                <Hangman />
            </svg> : (<>
                <img src={url} alt={isWin ? 'Win' : 'Loss'} />
                <Status isSuccess={isWin && finished} content={finishedWord} />
            </>)
            }
        </div>
    );
}