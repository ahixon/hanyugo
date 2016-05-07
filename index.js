import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import hanyugoApp from './reducers'
import App from './components/App'
import { addCard } from './actions'

let store = createStore(hanyugoApp, {
  review: {
    current: {
      currentCard: 0,
      prevCard: 0,

      cardIds: [0], // current card is implicitly first one
      // log
      start: null,
      finish: null
    },

    previous: []
  },

  content: {
    data: {
      0: {
        levelTextbook: 0,
        levelVocab: 0,

        hanziSimp: '好',
        hanziTrad: '好',

        pinyin: ['hao'],

        meaning: ['good'],
        meaningAnswers: ['good', 'happy'],

        learnable: true,
        info: 'Means both happy, and can be used to join a noun and adjective.',
        audio: 'hao.wav',

        frame: null,
        strokeCount: 8
      },
    },

    activities: { },

    meaningAnswers: { },

    pinyin: {
      'hao': [ 0 ]
    },

    pinyinAtonal: {
      'hao': [ 0 ]
    }
  },

  cards: {
    0: {
      groupId: 0,

      topic: 'vocab',
      content: {
        contentId: 0,
        front: ['character', 'pinyin'], // pinyin, character
        back: ['meaning', 'audio'],
      },

      schedule: {
        nextDue: null,
        repetitions: 0,
        ef: 2.5,
        seen: 0,
        lapses: 0,

        type: 'new', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 0,
        interval: null
      }
    }
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
