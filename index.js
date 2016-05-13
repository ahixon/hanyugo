import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import hanyugoApp from './reducers'
import App from './components/App'
import { addCard } from './actions'

import testStore from './storelayout'

let store = createStore(hanyugoApp, testStore)
store.dispatch({
  type: 'REVIEW_BEGIN',
  payload: {
    id: 0,
    cardIds: [0, 1],
    time: new Date()
  }
})

console.log (store.getState())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
