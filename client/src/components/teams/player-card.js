import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IconButton } from "@material-ui/core";
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import { red, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    rootContent: {
        display: 'inline-flex',
        width: '100%',
        boxShadow: theme.shadows[6],
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: 1,
    },
    cover: {
        width: '24%',
        justifyContent: 'flex-end'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    root: {
        display: 'flex',
        maxWidth: '80%',
        marginBottom: '0.5rem',
        "& .hidden-button": {
            display: 'none'
        },
        "&:hover .hidden-button": {
            display: 'flex',
            alignSelf: 'flex-start',
            borderRadius: '0 0.2rem 0.2rem 0',
            backgroundColor: grey[300],
            transition: 'all 0.2s ease-in-out'
        },
    },
    closeIcon: {
        color: red[500], 
    },
    buttonClass: {
        padding: theme.typography.pxToRem(8),
    },
}));

const PlayerCard = ({ playerIcon, player, onClear, index, pkey: key, playerType }) => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <Card key={`${key}-card`} className={classes.rootContent}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography key={`${key}-name`} component="h5" variant="h5">
                        {player['player_name']}
                    </Typography>
                    <Typography key={`${key}-bat-hand`} variant="subtitle1" color="textSecondary">
                        {player['batting_hand'] ? player['batting_hand'].replace('_', ' '):'Bat skill NA'}
                    </Typography>
                    <Typography key={`${key}-bowl-skill`} variant="subtitle1" color="textSecondary">
                        {player['bowling_skill'] ? player['bowling_skill']:'Bowl skill NA'}
                    </Typography>
                </CardContent>
            </div>
            <CardMedia key={`${key}-card-media`}
                className={`${classes.cover} ml-auto`}
                image={playerIcon}
                title={playerType}
            />
        </Card>
        <div className='hidden-button'> 
            <IconButton key={`${key}-icon-button`} className={classes.buttonClass} onClick={e => onClear(e, player, playerType)}>
                <CloseTwoToneIcon key={`${key}-close-icon`} className={classes.closeIcon} />
            </IconButton>
        </div>
    </div>
    );
}

export default PlayerCard;