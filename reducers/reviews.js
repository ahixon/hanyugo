import review from './review'

const reviews = (state = {
  reviews: {},
  currentReviewId: null,
  prevReviewId: null
}, action) => {
  if (!action.type) {
    return state;
  }

  switch (action.type) {
    case 'REVIEW_BEGIN':
      if (!action.payload) {
        return state;
      }

      return Object.assign({}, state, {
        reviews: Object.assign({}, state.reviews, {
          [ action.payload.id ]: review (undefined, action)
        }),
        currentReviewId: action.payload.id
      })
    case 'REVIEW_END':
      if (!action.payload) {
        return state;
      }
      
      return Object.assign({}, state, {
        reviews: Object.assign({}, state.reviews, {
          [ action.payload.id ]: review (state.reviews[action.payload.id], action)
        }),
        currentReviewId: null,
        prevReviewId: state.currentReviewId
      })
    default:
      return state
  }
}

export default reviews