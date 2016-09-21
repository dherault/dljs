import React, { PropTypes } from 'react';

const _ = {
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '25%',
    height: '100%',
    padding: '1rem',
    borderLeft: '1px solid LightGrey',
    backgroundColor: 'WhiteSmoke',
  },
};

const Logger = ({ logs }) => (
  <div style={_.root}>
    <strong>Log</strong>
    {logs.map(({ message }, i) => (
      <div key={i} style={_.message}>
        {message}
      </div>
    ))}
  </div>
);

Logger.propTypes = {
  logs: PropTypes.array.isRequired,
};

export default Logger;
