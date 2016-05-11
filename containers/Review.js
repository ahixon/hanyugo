import React from 'react'
import { connect } from 'react-redux'
import cards from '../reducers/cards'
import Card, { CardDebug } from './Card'
import { addCard } from '../actions'

let Review = ({ gotUserResponse, cards, currentCardIds, currentCardId }) => {
  return (
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
        <Card id={ currentCardId } onCompleted={ score => { gotUserResponse (currentCardId, score) } } />
        <a href='#'>Give up</a>
      </div>
    </div>
  )
}

const getNextCardId = (state) => {
  const now = new Date()

  return state.review.current.cardIds.find(id => {
    return state.cards[id].schedule.nextDue ? (state.cards[id].schedule.nextDue <= now) : true
  })
}

const mapStateToProps = (state) => {
  const now = new Date()

  return {
    currentCardIds: state.review.current.cardIds,
    currentCardId: getNextCardId (state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gotUserResponse: (cardid, score) => {
      console.log ('dispatching update on', cardid)

      dispatch ({
        type: 'SCHEDULE_UPDATE',
        payload: {
          id: cardid,
          score,
          time: new Date()
        }
      })

      console.log ('done?')
    }
  }
}

Review = connect(
  mapStateToProps,
  mapDispatchToProps
)(Review)

export default Review