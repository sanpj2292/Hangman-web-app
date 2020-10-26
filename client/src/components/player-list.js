import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function CheckboxList(props) {
  const classes = useStyles();

  const {rows, columns, apiRef} = props;

  const onSelectionChange = params => {
    // console.log(apiRef);
    const {rows} = params;
    if (rows.length > 3) {
      rows.splice(0, rows.length - 3);
      apiRef.current.selectRows(rows.map(row => row.id), true, true);
    }
  }

  return (
    <>
      <div style={{ height: 400, width: '100%' }} className={classes.root}>
        <DataGrid pageSize={5} checkboxSelection
          components={{
            noRowsOverlay: (params) => {
              if (!apiRef.current) {
                apiRef.current = params.api.current;
              }
              return <div>No rows</div>;
            }
          }}
          onSelectionChange={onSelectionChange} rows={rows} columns={columns} />
      </div>
    </>
  );
}
