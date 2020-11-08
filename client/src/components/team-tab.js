import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography } from '@material-ui/core';
import TeamsTabPanel from './team-tab-panel';
import PlayerDetails from "./teams/player-details";

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            // maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  
const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: '#000',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
}))((props) => <Tab disableRipple {...props} />);
  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxHeight: '100%',
    },
    padding: {
      padding: theme.spacing(3),
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#F9F9F9',
    },
}));
  
export default function PlayerTabs(props) {
    const classes = useStyles();
    const {onTabChange, value, team1, team2, onUnlinkPlayerToTeam,...otherProps} = props;
  
    return (
      <div className={classes.root}>
        <div className={classes.demo2}>
          <StyledTabs value={value} onChange={onTabChange} variant='fullWidth' aria-label="styled tabs example">
            <StyledTab label="Team-1" />
            <StyledTab label="Team-2" />
          </StyledTabs>
          <TeamsTabPanel value={value} id='team-1' index={0}>
            <PlayerDetails team='team-1' batsmen={team1.batsmen} bowlers={team1.bowlers} onClear={onUnlinkPlayerToTeam} />
          </TeamsTabPanel>
          <TeamsTabPanel value={value} id='team-2' index={1}>
            <PlayerDetails team='team-2' batsmen={team2.batsmen} bowlers={team2.bowlers} onClear={onUnlinkPlayerToTeam} />
          </TeamsTabPanel>
        </div>
      </div>
    );
}