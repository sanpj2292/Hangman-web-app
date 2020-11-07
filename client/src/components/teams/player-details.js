import React from 'react';
import PlayerCard from "./player-card";


export default function PlayerDetails(props) {
  const { batsmen, bowlers, onClear, team } = props;
  const bowler = bowlers && bowlers.length > 0 ? bowlers[0] : null;
  return (
    <>
        { batsmen && batsmen.length > 0 &&
          batsmen.map((batsman, i) => {
            return <PlayerCard key={`${team}-batsman-${i}-key`} pkey={`${team}-batsman-${i}-key`} 
              player={batsman} index={i}
              playerIcon={require("../../static/league/batsman_2.png")} onClear={onClear}
              playerType='Batsman'
            />
          })
        }
        {bowler && <PlayerCard  key={`${team}-bowler-key`} pkey={`${team}-bowler-key`} 
          player={bowler} index={0}
          playerIcon={require("../../static/league/bowler.jpg")} onClear={onClear}
          playerType='Bowler'/>
        }
    </>
  );
}
