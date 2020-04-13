import React, { useContext } from 'react';
import { AppContext } from '../../contexts/context-provider';
import Battery from "../battery/battery";

const Attempts = () => {
    const { attempts, totalAttempts } = useContext(AppContext);
    return (
        attempts > 0 ? (
            <div className='d-inline-flex flex-row flex-wrap'>
                <h6>Attempts Left: </h6>
                <Battery actual={attempts} total={totalAttempts} />
            </div>
        ) : null
    );
};

export default Attempts;