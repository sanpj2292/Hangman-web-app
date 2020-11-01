import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function TeamsTabPanel(props) {
  const { children, value, id, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-panel`}
      aria-labelledby={`${id}-panel`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TeamsTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TeamsTabPanel;