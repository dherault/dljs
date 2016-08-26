import React, { Component, PropTypes } from 'react';

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

export default class Logger extends Component {

  constructor() {
    super();

    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.socket.on('log', msg => this.addMessage(msg));
    this.props.socket.on('inputRequest', msg => this.addMessage(`Server requested input:\n${msg}`));
    this.props.socket.on('inputResponse', msg => this.addMessage(`User inputed:\n${msg}`));
  }

  addMessage(message) {
    const messages = this.state.messages.slice();

    messages.push(message);

    this.setState({ messages });
  }

  render() {
    return (
      <div style={_.root}>
        <strong>Log</strong>
        {this.state.messages.map((message, i) => (
          <div key={i} style={_.message}>
            {message}
          </div>
        ))}
      </div>
    );
  }
}

Logger.propTypes = {
  socket: PropTypes.object.isRequired,
};
