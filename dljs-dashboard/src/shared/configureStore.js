const { createStore } = require('redux');
const rootReducer = require('./reducers');

function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')));

  return store;
}

module.exports = configureStore;
