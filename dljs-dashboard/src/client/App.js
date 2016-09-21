import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Logger from './components/Logger';
import Input from './components/Input';

const App = ({ actions, logs, inputs }) => (
  <div>
    <h1>DLJS dashboard</h1>
    <Logger logs={logs} />
    <Input inputs={inputs} actions={actions} />
  </div>
);

App.propTypes = {
  actions: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  inputs: PropTypes.array.isRequired,
};

const mapStateToProps = ({ logs, inputs }) => ({ logs, inputs });

export default connect(mapStateToProps)(App);
