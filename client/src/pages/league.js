import React, { useState, useEffect, useRef, useContext } from 'react';
// import styled from "styled-components";
import { columns } from "../components/utils/players";
import { getPlayers } from "../contexts/context-util";
import PlayerList from "../components/player-list";

import { AppContext } from "../contexts/context-provider";
import { toggleMsgAlert, toggleGridLoading, selectTeamPlayers } from "../contexts/actions";
import MessageAlert from '../components/message-alert';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import TeamTabs from "../components/team-tab";
import { Button } from "@material-ui/core";
import PlayerTypeRadioGroup from '../components/teams/player-type';


const useStyles = makeStyles(theme => ({
    centerAlign: {
        margin: '0 auto'
    }
}));

export default function League (props) {
    const [rows, setRows] = useState([]);
    const classes = useStyles();
    const {dispatch, gridLoading, team1, team2} = useContext(AppContext);
    const counterRef = React.useRef({
        renderCount:0
    });

    const apiRef = useRef(null);
    const searchPlayerRef = useRef('');
    
    const [tab, setTab] = useState(0);
    const onTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const [playerType, setPlayerType] = useState('batsmen');

    const onPlayerTypeChange = (event) => {
        setPlayerType(event.target.value);
        if (apiRef.current.getSelectedRows().length > 0) {
            const ids = apiRef.current.getSelectedRows().map(r => r.id);
            apiRef.current.selectRows(ids, false);
        }
    };

    const onSaveTeam = e => {
        let alertData = {open: true, actionType: 'success', message: `Saved Team${tab + 1}`};
        const team = tab === 0 ? team1:team2;
        let errMsg = '';
        if (team.batsmen && team.batsmen.length < 3) {
            errMsg = `No of Batsmen < 3`;
        }
        if (team.bowlers && team.bowlers.length < 1) {
            errMsg += `${errMsg.length > 0 ? ' and ': ''}No bowler selected`;
        }
        if (errMsg.length > 0) {
            alertData = {open: true, actionType: 'error', message: `Cannot save team${tab+1} as current team has ${errMsg}`};
        }
        dispatch(toggleMsgAlert(alertData));
    };

    const onSelectPlayersClick = e => {
        const teamData = apiRef.current.getSelectedRows().map(row => row.data);
        const cloneRows = [...rows];
        const selectedPlayerIds = teamData.map(({ id }) => id);
        while (selectedPlayerIds.length > 0) {
            let i = selectedPlayerIds.pop();
            let ind = cloneRows.findIndex(row => row.id === i);
            cloneRows.splice(ind, 1);
        }
        setRows(cloneRows);
        dispatch(selectTeamPlayers(`team${tab + 1}`, playerType, teamData));
    };

    const getPlayerDetails = () => {
        dispatch(toggleGridLoading(true));
        let playerPromise = {};
        const alreadySelectedIds = getSelectedIds();
        if (alreadySelectedIds && alreadySelectedIds.length > 0) {
            playerPromise = getPlayers(searchPlayerRef.current.value, alreadySelectedIds);
        } else {
            playerPromise = getPlayers(searchPlayerRef.current.value);
        }
        playerPromise.then(res => {
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
    
    const onUnlinkPlayerToTeam = (e, player, type) => {
        const key = type === 'Batsman' ? 'batsmen':'bowlers';
        const cloneTeam = Object.assign({}, tab === 0 ? team1:team2);
        const ind = cloneTeam[key].findIndex(t => t.id === player.id);
        if (ind >= 0) {
            cloneTeam[key].splice(ind, 1);
            const cloneRows = [...rows];
            cloneRows.push(player);
            dispatch(selectTeamPlayers(`team${tab + 1}`, type, cloneTeam));
            setRows(cloneRows);
        }
    };

    useEffect(() => {
        getPlayerDetails();
    }, [apiRef.current]);

    const getPlayerSelRestriction = () => {
        if (playerType === 'batsmen') {
            const team = tab === 0 ? team1:team2;
            return 3 - team[playerType].length;
        } 
        return 1;
    }

    const getSelectedIds = () => {
        const team1Ids = [...team1.batsmen.map(pl => `${pl.id}`), ...team1.bowlers.map(pl => `${pl.id}`)];
        const team2Ids = [...team2.batsmen.map(pl => `${pl.id}`), ...team2.bowlers.map(pl => `${pl.id}`)];
        return [...team1Ids, ...team2Ids];
    };

    return (
        <>
            <MessageAlert />
            {/* <div className='container'> */}
                <div className={`row my-2 mx-2`}>
                    <div className='pt-2 col-xs-3 col-sm-3 col-md-3'>
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
                    <div className="pt-2 col-xs-1">
                        <PlayerTypeRadioGroup onPlayerTypeChange={onPlayerTypeChange} 
                            value={playerType} />
                    </div>
                    <div className="pt-2 col-xs-1">
                        <Button variant="contained" color="primary" onClick={onSelectPlayersClick}>
                            Select Players
                        </Button>
                    </div>
                    <div className="col-xs-1 pt-2 ml-auto">
                        <Button variant='contained' color='primary' onClick={onSaveTeam}>
                            Save Team
                        </Button>
                    </div>
                </div>
                <div className='row'>
                    <div className='ml-4 col-7'>
                        <PlayerList apiRef={apiRef} rows={rows} 
                            playerSelRestriction={getPlayerSelRestriction()}
                            columns={columns} gridLoading={gridLoading} />
                    </div>
                    <div className='col'>
                        <TeamTabs value={tab} onTabChange={onTabChange} team1={team1} team2={team2} 
                            onUnlinkPlayerToTeam={onUnlinkPlayerToTeam}
                        />
                    </div>
                </div>
            {/* </div> */}
        </>
    );
}