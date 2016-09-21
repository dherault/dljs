const { Plugin } = require('dljs');
const socketIo = require('socket.io');
const socketIoClient = require('socket.io-client');

const serve = require('./serve');
const configureStore = require('../shared/configureStore');
const registerActionCreators = require('../shared/actions');

const defaultParams = {
  host: 'localhost',
  port: 3000,
  socketPort: 3001,
};

const defaultAwaitInputPayload = {
  message: 'Press ok to continue',
  inputType: 'button',
  inputLabel: 'ok',
};

class DashboardPlugin extends Plugin {
  constructor(params) {
    super({
      name: 'dashboard',
    });

    this.params = Object.assign({}, defaultParams, params);

    this.io = socketIo(this.params.socketPort);
    this.io.on('connection', socket l=> this._handleNewConnection(socket));

    this.socket = socketIoClient(`http://localhost:${this.params.socketPort}`);

    console.log('socket', this.socket.emit);
    process.exit();

    this.store = configureStore();
    this.actionCreators = registerActionCreators(this.io.sockets, this.store);

    this.awaitInputResolvers = {};

    // Side effects
    this.store.subscribe(() => {
      const records = this.store.getState().records;
      const { type, payload } = records[records.length - 1];

      if (type === 'RESPONSE_INPUT') {
        this.awaitInputResolvers[payload.id](payload.value);
      }
    });
  }

  serve() {
    return serve(this.params);
  }

  log(...messages) {
    this.actionCreators.createLog(messages.join(' '));
  }

  awaitInput(payload = defaultAwaitInputPayload) {
    return new Promise((resolve, reject) => {
      if (!payload.message) return reject('Invalid input request: missing message');
      if (!payload.type) return reject('Invalid input request: missing type');

      const id = Math.random().toString().slice(2);
      const workingPayload = Object.assign({}, payload, { id });

      this.actionCreators.requestInput(workingPayload);

      this.awaitInputResolvers[id] = resolve;
    });
  }

  _handleNewConnection(socket) {
    console.log('new connection!', socket.id);

    socket.on('action', this.store.dispatch);
    // socket.emit('action', createLog(`Connected to server! Your id is ${socket.id}`));
  }
}

module.exports = DashboardPlugin;
