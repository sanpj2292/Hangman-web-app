import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '60%',
    maxHeight: '75%',
    marginBottom: '0.5rem'
    // flexDirection: 'column'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 128,
    width: '27%',
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
}));

export default function PlayerDetails(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { batsmen, bowlers } = props;
  const bowler = bowlers && bowlers.length > 0 ? bowlers[0] : null;
  

  return (
    <>
        { batsmen && batsmen.length > 0 &&
          batsmen.map(player => {
            return <Card className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {player['player_name']}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {player['batting_hand'] ? player['batting_hand'].replace('_', ' '):'Bat skill NA'}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {player['bowling_skill'] ? player['bowling_skill']:'Bowl skill NA'}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={`${classes.cover} ml-auto`}
                  image={require("../../static/league/batsman_2.png")}
                  title="Batsman"
                />
              </Card>
          })
        }
        {bowler && <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {bowler['player_name']}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {bowler['batting_hand'] ? bowler['batting_hand'].replace('_', ' '):'Bat skill NA'}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {bowler['bowling_skill'] ? bowler['bowling_skill']:'Bowl skill NA'}
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={`${classes.cover} ml-auto`}
            image={require("../../static/league/bowler.jpg")}
            title="Bowler"
          />
        </Card>}
    </>
  );
}
