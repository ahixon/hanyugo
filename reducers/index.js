import { combineReducers } from 'redux'
import cards from './cards'
import reviews from './reviews'

// TODO: `data' can get moved out one more step IMHO
const hanyugoApp = combineReducers({
  cards,
  data: (state = {}, action) => { return state },
  reviews
})

export default hanyugoApp
