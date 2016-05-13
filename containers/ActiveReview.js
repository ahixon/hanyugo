import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'

let ActiveReview = ({ endReview, review, currentCardId, currentCard }) => {
  let cardElem
  if (currentCard != null) {
    cardElem = (<Card id={ currentCardId } />)
  } else {
    cardElem = (<div>
      <center>
        <h1>All cards done!</h1>
        <button onClick={ endReview }>Finish</button>
      </center>
    </div>)
  }

  return (<div>
    <p>ReviewFeedbackBar here</p>
    { cardElem }
  </div>)
}

const getNextCardId = (review, state) => {
  const now = new Date()

  return review.cardIds.find(id => {
    return state.cards[id].schedule.nextDue ? (state.cards[id].schedule.nextDue <= now) : true
  })
}

const mapStateToProps = (state, ownProps) => {
  let currentCardId = getNextCardId (ownProps.review, state)

  return {
    currentCardId,
    currentCard: currentCardId !== undefined ? state.cards[currentCardId] : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endReview: () => {
      dispatch({
        type: 'REVIEW_END',
        payload: {
          id: ownProps.review.id,
          time: new Date()
        }
      })
    }
  }
}

ActiveReview = connect (
  mapStateToProps,
  mapDispatchToProps
)(ActiveReview)

export default ActiveReview