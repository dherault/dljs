const { Plugin } = require('dljs');
const socketIo = require('socket.io');
const serve = require('./serve');

const defaultParams = {
  host: 'localhost',
  port: 3000,
  socketPort: 3001,
};

class DashboardPlugin extends Plugin {
  constructor(params) {
    super({
      name: 'dashboard',
    });

    this.params = Object.assign({}, defaultParams, params);
    this.io = socketIo(this.params.socketPort);

    this.inputCallback = null;
    this.inputMessage = null;

    this.io.on('connection', socket => {
      console.log('new connection!');

      socket.emit('log', 'Connected to server');

      if (this.inputCallback) socket.emit('inputRequest', this.inputMessage);

      socket.on('inputResponse', data => {
        if (!this.inputCallback) return;

        const cb = this.inputCallback; // So we can reset this.inputCallback *before* we invoke the callbacl

        this.inputCallback = null;
        this.inputMessage = null;

        cb(data);
      });
    });
  }

  serve(cb) {
    serve(this.params, cb);
  }

  log(...messages) {
    this.io.emit('log', messages.join(' '));
  }

  awaitInput(message = 'Please click to continue', cb) {
    if (this.inputCallback) throw new Error('You are already awaiting an input!');
    if (typeof cb !== 'function') throw new Error(`Expected 2nd arg to be a function, got "${typeof cb}" instead.`);

    this.inputMessage = message;
    this.inputCallback = cb;

    this.io.emit('inputRequest', message);
  }
}

module.exports = DashboardPlugin;
