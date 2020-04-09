import React, { useContext, Fragment } from 'react';
import { AppContext } from '../../contexts/context-provider';

const DisplayWord = () => {
    const { displayWord } = useContext(AppContext);
    return (
        <Fragment>
            {
                Array.from(displayWord).map((char, i) => (
                    <div key={`guess-container-${i}`} className='p-1 d-flex flex-wrap justify-content-center'>
                        <p key={`guess-char-${i}`} className='h5'> {char} </p>
                    </div>
                ))
            }
        </Fragment>
    );
};

export default DisplayWord;