import { combineReducers } from 'redux'
import cards from './cards'

const hanyugoApp = combineReducers({
  cards,
  data: (state = {}, action) => { return state },
  review: (state = {}, action) => { return state }
})

export default hanyugoApp
