import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import hanyugoApp from './reducers'
import App from './components/App'
import { addCard } from './actions'

import testStore from './storelayout'

function configureStore(initialState) {
  const store = createStore(hanyugoApp, initialState, compose(
    // applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}

let store = configureStore(testStore)
console.log (store)
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
