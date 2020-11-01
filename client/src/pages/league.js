import React, { useState, useEffect, useRef, useContext } from 'react';
// import styled from "styled-components";
import { columns } from "../components/utils/players";
import { getPlayers } from "../contexts/context-util";
import PlayerList from "../components/player-list";

import { AppContext } from "../contexts/context-provider";
import { toggleMsgAlert, toggleGridLoading } from "../contexts/actions";
import MessageAlert from '../components/message-alert';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import TeamTabs from "../components/team-tab";


const useStyles = makeStyles(theme => ({
    centerAlign: {
        margin: '0 auto'
    }
}));

export default function League (props) {
    const [rows, setRows] = useState([]);
    const classes = useStyles();
    const {dispatch, gridLoading} = useContext(AppContext);
    const counterRef = React.useRef({
        renderCount:0
    });

    const apiRef = useRef(null);
    const searchPlayerRef = useRef('');
    
    const [tab, setTab] = useState(0);
    const onTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const getPlayerDetails = () => {
        dispatch(toggleGridLoading(true));
        getPlayers(searchPlayerRef.current.value)
        .then(res => {
            counterRef.current.renderCount += 1;
            console.log('no of render**:', counterRef.current.renderCount);
            console.log("apiRef.current**:", apiRef.current);
        
            const rowModels = apiRef?.current?.getRowModels();
            if (rowModels !== undefined && apiRef.current) {
                apiRef.current.setRowModels(rowModels);
                dispatch(toggleMsgAlert({
                    actionType: 'success',
                    message: 'Data successfully loaded', 
                    open: true
                }));
                setRows(res);
                dispatch(toggleGridLoading(false));
            }
        })
        .catch(err => {
            dispatch(toggleMsgAlert({
                actionType: 'error',
                message: err.message,
                open: true
            }));
            dispatch(toggleGridLoading(false));
        });
    }
    
    useEffect(() => {
        getPlayerDetails();
      }, [apiRef.current]);

    return (
        <>
            <MessageAlert />
            {/* <div className='container'> */}
                <div className={`row col-xs-3 col-sm-3 col-md-3 py-2 my-2 mx-2`}>
                    <TextField id="standard-search" type="search" 
                        inputRef={searchPlayerRef}
                        fullWidth
                        placeholder='Search for a player' 
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                getPlayerDetails();
                            }
                        }}
                        onChange={e => {
                            // When the input is cleared, load the grid
                            if (!searchPlayerRef.current.value) {
                                getPlayerDetails();
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={getPlayerDetails}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className='row'>
                    <div className='ml-4 col-7'>
                        <PlayerList apiRef={apiRef} rows={rows} 
                            columns={columns} gridLoading={gridLoading} />
                    </div>
                    <div className='col'>
                        <TeamTabs value={tab} onTabChange={onTabChange} />
                    </div>
                </div>
            {/* </div> */}
        </>
    );
}