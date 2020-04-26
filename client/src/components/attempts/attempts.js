import React, { useContext, Fragment } from 'react';
import { AppContext } from '../../contexts/context-provider';
import Battery from "../battery/battery";
import HangmanScaffold from "../hangman/scaffold";

const Attempts = () => {
    const { attempts, totalAttempts } = useContext(AppContext);
    return (
        attempts >= 0 ?
            (
                <Fragment>
                    <HangmanScaffold />
                    {/* <div className='container'> */}
                    {/* <div className='row'> */}
                    {/* <div className='col-sm-10'>
                        </div> */}
                    {/* <div className='col-sm-2'>
                            <p>Attempts Left: </p>
                            <Battery actual={attempts} total={totalAttempts} />
                        </div> */}
                    {/* </div> */}
                    {/* </div> */}
                </Fragment>
            ) : null
    );
};

export default Attempts;