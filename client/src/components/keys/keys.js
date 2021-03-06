import React, { Fragment, useContext } from 'react';
import { AppContext } from '../../contexts/context-provider';
import './keys.styles.css'

const Keys = ({ keyList }) => {
    const { keys } = useContext(AppContext);
    return (
        <Fragment>
            {
                keyList.map((k, ind) => {
                    const { key, init, wrong } = keys[k];
                    return (
                        <div key={`btn-container-${ind}`} className='btn-overlay mt-1'>
                            <button
                                key={`char-key-${ind}`}
                                tabIndex={ind}
                                type="button"
                                className={`btn btn-circle btn-sm 
                                    ${init ? 'btn-primary ' : (wrong ? 'btn-danger disabled' : 'btn-success disabled')}`
                                }>
                                {key.toUpperCase()}
                            </button>
                        </div>)
                })
            }
        </Fragment>
    );
}

export default Keys;