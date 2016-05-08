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

console.log (store.getState())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
