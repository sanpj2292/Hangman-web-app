import React, { useContext } from 'react';
import { AppContext } from '../../contexts/context-provider';
import Battery from "../battery/battery";
import HangmanScaffold from "../hangman/scaffold";

const Attempts = () => {
    const { attempts, totalAttempts } = useContext(AppContext);
    return (
        attempts >= 0 ? (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-10'>
                        <HangmanScaffold />
                    </div>
                    {/* <div className='col-sm-2'>
                        <h6>Attempts Left: </h6>
                        <Battery actual={attempts} total={totalAttempts} />
                    </div> */}
                </div>
            </div>
        ) : null
    );
};

export default Attempts;