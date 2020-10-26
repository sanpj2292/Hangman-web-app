import React, { useState, useEffect, useRef, useContext } from 'react';
// import styled from "styled-components";
import { columns } from "../components/utils/players";
import { getPlayers } from "../contexts/context-util";
import PlayerList from "../components/player-list";

import { AppContext } from "../contexts/context-provider";
import { toggleMsgAlert } from "../contexts/actions";
import MessageAlert from '../components/message-alert';

export default function League (props) {
    const [rows, setRows] = useState([]);
    const {dispatch} = useContext(AppContext);
    const counterRef = React.useRef({
        renderCount:0
    });

    const apiRef = useRef(null);
    
    useEffect(() => {
        getPlayers()
        .then(res => {
            counterRef.current.renderCount += 1;
            console.log('no of render**:', counterRef.current.renderCount);
            console.log("apiRef.current**:", apiRef.current);
        
            const rowModels = apiRef?.current?.getRowModels();
            if (rowModels !== undefined && apiRef.current) {
              apiRef.current.setRowModels(rowModels);
              setRows(res);
              dispatch(toggleMsgAlert({type: 'success', message: 'Data successfully loaded'}));
            }
        })
        .catch(err => {
            dispatch(toggleMsgAlert({
                actionType: 'error',
                message: err.message,
                open: true
            }));
        });
      }, [apiRef.current]);

    return (
        <div className='container'>
            <MessageAlert />
            <PlayerList apiRef={apiRef} rows={rows} 
                columns={columns}/>
        </div>
    );
}