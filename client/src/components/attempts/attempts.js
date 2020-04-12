import React, { useContext } from 'react';
import { AppContext } from '../../contexts/context-provider';

const Attempts = () => {
    const { attempts } = useContext(AppContext);
    return (
        <h6>Attempts Left: {attempts}</h6>
    )
};

export default Attempts;