import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, dispatch } from 'redux'
import hanyugoApp from './reducers'
import App from './components/App'

let store = createStore(hanyugoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
