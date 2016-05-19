const review = (state = {
  timeStart: null,
  timeFinish: null,

  // two requirements for display:
  // - is in cardIds, and
  // - has dueDate that is <= now
  cardIds: [],
}, action) => {
  if (!action.type) {
    return state;
  }

  switch (action.type) {
    case 'REVIEW_BEGIN':
      return Object.assign({}, state, {
        id: action.payload.id,
        timeStart: action.payload.time,
        cardIds: action.payload.cardIds
      })
    case 'REVIEW_END':
      return Object.assign({}, state, {
        timeFinish: action.payload.time
      })
    case 'REVIEW_ADD_CARDS':
      return Object.assign({}, state, {
        cardIds: state.cardIds.concat (action.payload)
      })
    default:
      return state
  }
}

export default review