import React from 'react'
import { connect } from 'react-redux'
import cards from '../reducers/cards'
import Card, { CardDebug } from './Card'
import { addCard } from '../actions'

let Review = ({ gotUserResponse, cards, currentCardIds }) => (
  <div>
    <div style={{ float: 'right', width: '50%', border: '1px solid #babdb6', 'overflowY': 'scroll', height: '300px' }}>
      {currentCardIds.map (id =>
        <div key={ id } style={{ padding: '1em', margin: '1em', border: '1px solid #eeeeec' }}>
          <CardDebug id={ id } />
        </div>
      )}
    </div>

    <div style={{ width: '50%', height: '300px' }}>
      <p>ReviewResponseStatus here</p>
      <Card id='0' onCompleted={ gotUserResponse } />
      <a href='#'>Give up</a>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    currentCardIds: state.review.current.cardIds
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gotUserResponse: () => {
      console.log ('finished scoring card, yay! should change out card now');
    }
  }
}

Review = connect(
  mapStateToProps,
  mapDispatchToProps
)(Review)

export default Review