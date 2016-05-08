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

var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

let Card = ({ card, onCompleted }) => {
  var objectRenderer

  if (card.topic == 'activity') {
    // objectRenderer = <ActivityCard onCompleted={this.props.onCompleted} id={ card.content } />
    objectRenderer = <p>Have activity card.</p>
  } else if (card.topic == 'vocab') {
    objectRenderer = <VocabCard onCompleted={ onCompleted } {...card.content} />
  } else {
    objectRenderer = <p>Unknown card type { card.topic }.</p>
  }

  return (
    <div>
    { objectRenderer }
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
      // score for this card is average of all subtasks
      // TODO: may want to cap to 2 if one of the scores was < 2?
      const cardScore = average (subscores)

      // mark our score for this card, and reschedule if needed
      // TODO: IMPLEMENT SCORING
      // dispatch (scoreCard (ownProps.id, cardScore));

      // and call the parent to notify them to display the next one or whatever
      ownProps.onCompleted (cardScore);
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

  if (card.topic == 'vocab') {
    info = <strong>{ card.content.back.join (' + ') } of { vocabData.hanziSimp }</strong>
  } else {
    info = ''
  }

  return (
    <div>
      <h3>Card #{ id }: { card.topic }</h3>
      { info }
    </div>
  )
}

const mapCardDebugStateToProps = (state, ownProps) => {
  return {
    card: state.cards[ownProps.id],
    vocabData: state.data.vocab[state.cards[ownProps.id].content.contentId]
  }
}

CardDebug = connect(mapCardDebugStateToProps)(CardDebug)

export { CardDebug }