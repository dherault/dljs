import React, { Component, PropTypes } from 'react';

const _ = {
  root: {
  },
};

export default class Input extends Component {

  constructor() {
    super();

    this.state = { message: null };
  }

  componentDidMount() {
    this.props.socket.on('inputRequest', message => this.setState({ message }));
  }

  handleSubmit(value = 'ok') {
    this.props.socket.emit('inputResponse', value);

    this.setState({ message: null });
  }

  render() {
    const { message } = this.state;

    const sRoot = Object.assign({
      visibility: message ? 'visible' : 'hidden',
    }, _.root);

    return (
      <div style={sRoot}>
        {message}
        <button onClick={() => this.handleSubmit()}>Continue</button>
      </div>
    );
  }
}

Input.propTypes = {
  socket: PropTypes.object.isRequired,
};
