const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  logs(state = [], action) {

    if (action.type === 'CREATE_LOG') {
      const newState = state.slice();

      newState.push(action.payload);

      return newState;
    }

    return state;
  },

  inputs(state = [], action) {
    switch (action.type) {
      case 'REQUEST_INPUT': {
        const newState = state.slice();

        newState.push(action.payload);

        return newState;
      }

      case 'RESPONSE_INPUT': {
        const newState = state.slice();
        const payloadId = action.payload.id;
        const indexOfInput = newState.findIndex(({ id }) => id === payloadId);

        if (indexOfInput === -1) throw new Error(`Oh no! Given input with id ${payloadId} not found :(`);

        const newInput = Object.assign({}, newState[indexOfInput]);

        newInput.value = action.payload.value;
        newState[indexOfInput] = newInput;

        return newState;
      }

      default: return state;
    }
  },

  records(state = [], action) {
    const newState = state.slice();

    newState.push(action);

    return state;
  },
});

module.exports = rootReducer;
