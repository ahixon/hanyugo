// Card is responsible for determining whether to render A SINGLE
// Activity or SRSActivity activity, and from handling the events
// to the activity itself to the Review (which handles multiple
// Cards in the Review and only displays the current one).
//
// Card is responsible for scoring the current card. It is not
// responsible for updating the Review; that's Review's job.
//
// Card is also responsible for timing
// Card is specifically for SRS activities. SRSActivity may
// be used in other contexts.

import React from 'react'
import { connect } from 'react-redux'

import { scoreCard } from '../actions'
import VocabCard from './VocabCard'

let Card = ({ card, onCompleted }) => {
  var objectRenderer

  if (card.type == 'activity') {
    // objectRenderer = <ActivityCard onCompleted={this.props.onCompleted} id={ card.data } />
    objectRenderer = <p>Have activity card.</p>
  } else if (card.type == 'vocab') {
    objectRenderer = <VocabCard onCompleted={ onCompleted } {...card.data} />
  } else {
    objectRenderer = <p>Unknown card type { card.type }.</p>
  }

  return (
    <div>
    { objectRenderer }
    <a href='#'>Give up</a>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCompleted: (subscores) => {
      // mark our score for this card, and reschedule if needed
      dispatch (scoreCard (ownProps.id, cardScore, new Date()))

      if (ownProps.onCompleted !== undefined) {
        ownProps.onCompleted (cardScore);
      }
    }
  }
}

Card = connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)

export default Card

let CardDebug = ({ id, card, vocabData }) => {
  let info

  if (card.type == 'vocab') {
    info = <strong>{ card.data.back.join (' + ') } of { vocabData.hanziSimp }</strong>
  } else {
    info = ''
  }

  return (
    <div>
      <h3>Card #{ id }: { card.type }</h3>
      { info }
    </div>
  )
}

const mapCardDebugStateToProps = (state, ownProps) => {
  return {
    card: state.cards[ownProps.id],
    vocabData: state.data.vocab[state.cards[ownProps.id].data.contentId]
  }
}

CardDebug = connect(mapCardDebugStateToProps)(CardDebug)

export { CardDebug }