import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

function GridPagination(props) {
  const { paginationProps } = props;
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      page={paginationProps.page}
      count={paginationProps.pageCount}
      onChange={(event, value) => paginationProps.setPage(value)}
    />
  );
}

GridPagination.propTypes = {
  /**
   * The object containing all pagination details in [[PaginationProps]].
   */
  paginationProps: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    setPageSize: PropTypes.func.isRequired,
  }).isRequired,
};

export default GridPagination;