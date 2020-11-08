import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid";
import GridNoRowsOverlay from "./grid-overlays/no-rows-overlay";
import GridLoadingOverlay from './grid-overlays/loading-overlay';
import GridPagination from './grid-overlays/pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '58vw',
    height: '36vw',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function CheckboxList(props) {
  const classes = useStyles();

  const {rows, columns, apiRef, gridLoading, playerSelRestriction} = props;

  const onSelectionChange = params => {
    // console.log(apiRef);
    const {rows} = params;
    if (rows.length > playerSelRestriction) {
      rows.splice(0, rows.length - playerSelRestriction);
      apiRef.current.selectRows(rows.map(row => row.id), true, true);
    }
  }

  return (
    <>
      <div className={classes.root}>
        <DataGrid pageSize={20} checkboxSelection
          components={{
            noRowsOverlay: (params) => <GridNoRowsOverlay message='No Rows' />,
            loadingOverlay: (params) => {
              if (!apiRef.current) {
                apiRef.current = params.api.current;
              } 
              return <GridLoadingOverlay />;
            },
            pagination: GridPagination,
          }}
          loading={gridLoading}
          columnBuffer={2}
          onSelectionChange={onSelectionChange} 
          rows={rows} columns={columns} />
      </div>
    </>
  );
}
