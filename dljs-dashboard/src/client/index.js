import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import socketIo from 'socket.io-client';

import configureStore from '../shared/configureStore';
import registerActionCreators from '../shared/actions';

import App from './App';

require('normalize.css');
require('./app.css');

const socket = socketIo(process.env.socketUrl)
.on('connect', () => console.log('[WS] connected'))
.on('reconnect', () => console.log('[WS] re-connected'));

const store = configureStore();
const actions = registerActionCreators(store.dispatch, socket.broadcast.emit);
const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store}>
      <App actions={actions} />
    </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp actions={actions} />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
