import React, { Component, PropTypes } from 'react';

const _ = {
  root: {
  },
};

class Input extends Component {

  constructor() {
    super();

    this.state = { message: null };
  }

  render() {
    const { message } = this.state;

    const sRoot = Object.assign({
      visibility: message ? 'visible' : 'hidden',
    }, _.root);

    return (
      <div style={sRoot}>
        {message}
        <button onClick={() => null}>Continue</button>
      </div>
    );
  }
}

// Input.propTypes = {
// };

export default Input;
