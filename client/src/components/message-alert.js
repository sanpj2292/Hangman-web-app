import React, {useContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from "../contexts/context-provider";
import { toggleMsgAlert } from "../contexts/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MessageAlert() {
  const classes = useStyles();
  const {messageAlert: {open, message, type, position}, dispatch} = useContext(AppContext)


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleMsgAlert({open: false}));
  };
  const [vertical, horizontal] = position ? position.split('-'):['', ''];

  console.log(open, message, type);

  return (
    <div className={classes.root}>
      <Snackbar 
        anchorOrigin={{
            vertical: vertical ?  vertical:'bottom', 
            horizontal: horizontal ? horizontal:'right'
        }}
        open={open} 
        autoHideDuration={3000} 
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
