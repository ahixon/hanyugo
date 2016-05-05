const listenactivity = (state = {}, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      if (!state.userData[action.id]) {
        return state;
      }

      var newObj = {};
      newObj[action.id] = {
        completed: action.correct,
        attempts: state.userData[action.id].attempts + 1
      };

      return Object.assign({}, state, {
        userData: Object.assign({}, state.userData, newObj)
      })
    default:
      return state
  }
}

export default listenactivity