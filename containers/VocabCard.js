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
    this.props.onCompleted (this.state.scores);
    this.setState ({completed: true})
  }

  render() {
    const { contentId, front, back, onCompleted, vocabData } = this.props;
    return (
      <div>
      <h1>{front.map ((type, idx) => <VocabQuestion key={ idx } content={ vocabData } what={ type } />)}</h1>

      <hr />

      <VocabResponse content={ vocabData } what={ back } onCompleted={ this.onCompletedSubtask.bind (this) } />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    vocabData: state.data.vocab[ownProps.contentId]
  }
}

VocabCard = connect(
  mapStateToProps,
  null
)(VocabCard)

export default VocabCard