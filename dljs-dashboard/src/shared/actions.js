module.exports = (dispatch, emit) => {

  const bind = actionCreator => (...args) => {
    const action = actionCreator(...args);

    emit('action', action);

    return dispatch(action);
  };

  const bindAll = actionsCreators => {
    const boundActionCreators = {};

    Object.keys(actionsCreators).forEach(key => {
      boundActionCreators[key] = bind(actionsCreators[key]);
    });

    return boundActionCreators;
  };

  return bindAll({

    createLog: message => ({
      type: 'CREATE_LOG',
      payload: {
        message,
        date: Date.now(),
      },
    }),

    requestInput: payload => ({
      type: 'REQUEST_INPUT',
      payload,
    }),

    responseInput: payload => ({
      type: 'RESPONSE_INPUT',
      payload,
    }),

  });
};
