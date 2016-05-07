// VocabCard is an activity that manages a single character card. It handles
// managing the textboxes and renderers that the particular SRS card
// requires, and has callbacks for whether or not the card had an answer
// (whether incorrect or correct). 
//
// It is Card's responsbility to update scheduling information; the
// VocabCard only manages the answer comparisons (presumably bubbled up
// from the child which actually renders the particular card)
//
// VocabCard should not know anything about Reviews or Card scores.
//
// There are a few different things it can render depending on what is
// on the Front and Back; those are done by Questions.
//
// It maps over the contentIds to check for relevant answers.
// 

import React, { Component, PropTypes } from 'react'
import VocabQuestion from '../components/VocabQuestion'
import VocabResponse from '../components/VocabResponse'

import { connect } from 'react-redux'

export default class VocabCard extends Component {
  state = { scores: [], completed: false };

  onCompletedSubtask(score) {
    // should return array of scores
    console.log ('had score', score)
    var newScores = [...this.state.scores, score]
    console.log ('new scores', newScores)

    this.setState({scores: newScores})

    if (newScores.length == this.props.back.length) {
      // if we finished everything, call up parent's onCompleted
      this.setState ({completed: true})
      this.props.onCompleted (this.state.scores);
    }
  }

  render() {
    const { contentId, front, back, onCompleted, content } = this.props;
    return (
      <div>
      <h1>{front.map (type => <VocabQuestion content={ content } what={ type } /> )}</h1>

      <hr />

      {back.map (type => <VocabResponse content={ content } what={ type } onCompleted={ this.onCompletedSubtask.bind (this) } /> )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    content: state.content.data[ownProps.contentId]
  }
}

VocabCard = connect(
  mapStateToProps,
  null
)(VocabCard)

export default VocabCard