import moment from "moment";


export const columns = [
    {field: 'player_name', headerName:'Player Name', width: 200,},
    {
        field: 'dob',
        width: 140,
        headerName: 'Date of Birth', 
        type: 'date', 
        valueGetter: params => {
            const dob = params.getValue('dob');
            if (dob) {
                const formattedDob = moment(dob).format('YYYY/MM/DD');
                return formattedDob;
            }
            return 'Not Available';
        }
    },
    {field: 'batting_hand', headerName:'Batting Skill', width: 160},
    {field: 'bowling_skill', headerName:'Bowling Skill', width: 220},
  ];
  