import schedule from './schedule'

const card = (state = {
  id: undefined,
  type: null,
  data: null,
  schedule: schedule ()
}, action) => {
  switch (action.type) {
    case 'SCHEDULE_UPDATE':
      // TODO: create reviewlog; do this as another action?
      return Object.assign({}, state, {
        schedule: schedule (state.schedule, action)
      })
    case 'CARD_SET_TYPE':
      return Object.assign({}, state, {
        type: action.payload
      })
    case 'CARD_SET_DATA':
      // ensure we have contentId for vocab
      if (state.type == 'vocab' && !action.payload.contentId) {
        console.warn ('missing contentId for vocab type in', action.payload);
        return state;
      }

      return Object.assign({}, state, {
        data: action.payload
      })
    case 'CARD_ADD':
      // create from payload if provided
      return Object.assign({}, action.payload ? action.payload : state, {
        id: action.payload.id
      })
    default:
      return state
  }
}

export default card