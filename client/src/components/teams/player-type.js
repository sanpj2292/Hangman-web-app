import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function PlayerTypeRadioGroup(props) {
  

  const { onPlayerTypeChange, value } = props;

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Player Type</FormLabel> */}
      <RadioGroup row aria-label="Player Type" name="playerType" value={value} onChange={onPlayerTypeChange}>
        <FormControlLabel value="batsmen" control={<Radio />} label="Batsmen" />
        <FormControlLabel value="bowlers" control={<Radio />} label="Bowlers" />
      </RadioGroup>
    </FormControl>
  );
}