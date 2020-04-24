import React, { useContext } from 'react';
import { AppContext } from '../../contexts/context-provider';
import Battery from "../battery/battery";
import HangmanScaffold from "../hangman/scaffold";

const Attempts = () => {
    const { attempts, totalAttempts } = useContext(AppContext);
    return (
        attempts > 0 ? (
            <div className='d-inline-flex flex-row flex-wrap justify-content-center'>
                <HangmanScaffold />
                <div className='ml-auto pb-2'>
                    <h6>Attempts Left: </h6>
                    <Battery actual={attempts} total={totalAttempts} />
                </div>
            </div>
        ) : null
    );
};

export default Attempts;