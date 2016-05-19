import React from 'react'
import { connect } from 'react-redux'
import cards from '../reducers/cards'
import Card, { CardDebug } from './Card'
import ActiveReview from './ActiveReview'
import { addCard } from '../actions'

      // <div style={{ float: 'right', width: '50%', border: '1px solid #babdb6', 'overflowY': 'scroll', height: '300px' }}>
      //   {currentReview.cardIds.map (id =>
      //     <div key={ id } style={{ padding: '1em', margin: '1em', border: '1px solid #eeeeec' }}>
      //       <CardDebug id={ id } />
      //     </div>
      //   )}
      // </div>

let ReviewContainer = ({ prevReview, currentReview }) => {
  let reviewElement
  if (currentReview) {
    reviewElement = (<ActiveReview review={ currentReview } />)
  } else if (prevReview) {
    reviewElement = (<p>Review took { (prevReview.timeFinish - prevReview.timeStart)/1000 } seconds </p>)
  } else {
    reviewElement = (<p>No active review to do, nor any previous review to show statistics for.</p>)
  }

  return (
    <div>


      <div style={{ width: '50%', height: '300px', border: '1px solid #eeeeec' }}>
        { reviewElement }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentReview: state.reviews.currentReviewId !== undefined ? state.reviews.reviews[state.reviews.currentReviewId] : null,
    prevReview: state.reviews.prevReviewId !== undefined ? state.reviews.reviews[state.reviews.prevReviewId] : null
  }
}


ReviewContainer = connect(
  mapStateToProps,
  undefined
)(ReviewContainer)

export default ReviewContainer