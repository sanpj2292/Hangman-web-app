import React, { useContext } from "react";
import { AppContext } from "../../contexts/context-provider";
import "./scaffold.css";
import Hangman from "./hangman";
import Status from '../styled/typography/container';
import Button from "../styled/button";
import { reloadAction } from "../../contexts/actions";

export default function HangmanScaffold() {
    const { finished, finishedWord, isWin, dispatch } = useContext(AppContext);
    const url = isWin ?
        'https://media.giphy.com/media/KH21ScGPuE7QDS1Y9I/source.gif' :
        'https://media.giphy.com/media/rKj0oXtnMQNwY/source.gif';

    const restartGame = () => {
        // Mount the whole component again
        dispatch(reloadAction());
    };

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
                <div className='container'>

                    <div className='row'>
                        <div className='col-10 pl-0 mr-auto'>
                            <Status isSuccess={isWin && finished} content={finishedWord} />
                        </div>
                        <div className='col-2 ml-auto mt-2'>
                            <Button label='Restart' onClick={e => restartGame()} />
                        </div>
                    </div>
                </div>
            </>)
            }
        </div>
    );
}