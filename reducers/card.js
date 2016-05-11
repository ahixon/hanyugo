import schedule from './schedule'

const card = (state = {
  id: undefined,
  type: null,
  data: null,
  schedule: schedule ()
}, action) => {
  switch (action.type) {
    case 'SCHEDULE_UPDATE':
      // TODO: create reviewlog; do this as another reducer
      console.log ('update from card')
      return Object.assign({}, state, {
        schedule: schedule (state.schedule, action)
      })
    case 'CARD_SET_TYPE':
      return Object.assign({}, state, {
        type: action.payload
      })
    case 'CARD_SET_DATA':
      // ensure we have contentId for vocab
      if (state.type == 'vocab' && !action.payload.data.contentId) {
        console.warn ('missing contentId for vocab type in', action.payload.data);
        return state;
      }

      return Object.assign({}, state, {
        data: action.payload.data
      })
    case 'CARD_ADD':
      // create from payload if provided
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default card