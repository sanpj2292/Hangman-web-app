import React, { useContext, useEffect, useRef } from "react";

import {
    alertAction, winAction, lossAction, rightAction,
    wrongAction, dismissAlertAction
} from "../contexts/actions";

import Keys from '../components/keys/keys';
import DisplayWord from '../components/display-word/display-word';
import WithSpinner from "../components/HOC/with-spinner";
import Attempts from '../components/attempts/attempts';
import Accordion from "../components/styled/accordion";
import Alert from "../components/styled/alert";

import { setWrongKey, setRightKey, replaceWithMatchingChar } from "../contexts/context-util";
import { AppContext } from "../contexts/context-provider";

import './home.css';

function Home() {

    const { displayWord, details: { word, pos, meaning }, attempts,
        keys, dispatch, alert: { type, message } } = useContext(AppContext);

    const containerRef = useRef();

    // componentDidMount
    useEffect(() => {
        // To set focus to the keys container when it loads initially
        containerRef.current.focus();
    }, []);

    const onKeyUpHandler = e => {
        const { key } = e;

        // if key has already been pressed
        if (keys[key] && keys[key].pressed) {
            return dispatch(
                alertAction({
                    type: 'info',
                    message: `KEY: '${key.toUpperCase()}' has already been pressed`
                })
            );
        }
        if (keys[key]) {
            let i = word.indexOf(key);
            if (i > -1) {
                const newKeys = setRightKey(keys, key);
                const newDisplayWord = replaceWithMatchingChar(displayWord, word, key);
                // Win condition
                if (newDisplayWord.toLowerCase() === word) {
                    return dispatch(winAction());
                }
                // Not a win but right guess is rewarded
                return dispatch(rightAction(newKeys, newDisplayWord));
            }

            if (attempts - 1 > 0) {
                // Not a win/loss but wrong guess is being handled
                const newKeys = setWrongKey(keys, key);
                return dispatch(wrongAction(newKeys, attempts - 1));
            }                 // Loss condition before wrongAction
            e.stopPropagation();
            return dispatch(lossAction());

        }
    }

    return (
        <div className='row'>
            <div className='col left'>
                <div className='d-flex flex-wrap justify-content-center align-items-center py-1'>
                    {type && type.length > 0 ? <Alert {...{ type, message }} timeout={3000}
                        onDismissAlert={() => dispatch(dismissAlertAction())} /> : null}
                </div>
                <Attempts />
            </div>

            <div className='col'>
                <Accordion containerClasses='accordion' btnLabel='hint'>
                    <h5>{pos}</h5>
                    <p>{meaning}</p>
                </Accordion>
                <div className='container d-flex flex-wrap justify-content-center pb-3'>
                    <DisplayWord />
                </div>
                <div tabIndex={-1}
                    ref={containerRef}
                    className='key-container d-flex flex-wrap justify-content-center'
                    onKeyUp={onKeyUpHandler}>
                    <Keys keyList={Object.keys(keys)}></Keys>
                </div>
            </div>
        </div>
    );
}

export default WithSpinner(Home);