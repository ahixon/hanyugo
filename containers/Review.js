import React from 'react'
import { connect } from 'react-redux'
import cards from '../reducers/cards.js'

let Review = ({ cards, test }) => (
  <div>
  <ul>
    {cards.map(card =>
      <li key={card.contentId}>{card.front}</li>
    )}
  </ul>

  <a href='#' onClick={ test }>Test it</a>
  </div>
)

const mapStateToProps = (state) => {
  console.log ('have state', state);
  return {
    cards: Object.values(state.cards)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => {
      console.log ('hey!');

      dispatch ({
        type: 'ADD_CARD',
        card: {
          frontType: 'pinyin',
          backType: 'meaning',

          id: 0,
          contentId: 0,
          groupId: 0,

          front: ['hao'],
          back: ['good']
        }
      })

      return false;
    }
  }
}

Review = connect(
  mapStateToProps,
  mapDispatchToProps
)(Review)

export default Review