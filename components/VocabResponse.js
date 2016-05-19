// asks user for input (renders textbox if needed) and checks answer
// against card
//
// returns a score based on what the user put

import { HARD, NEARLY, KNEW_BUT_FORGOT, NO_IDEA } from '../reducers/cards'
import React, { Component, PropTypes } from 'react'

import TextAnswer from './TextAnswer'
import UserAnswer from './UserAnswer'

const textScore = (correct, took) => {
  var scaled;

  if (correct) {
    // can only scale based on time
    // drop 1 mark for every 10 seconds
    return Math.min (5 - Math.floor (took / 10), HARD)
  } else {
    // scale based on attempts and time
    if (took <= 10 && attempts <= 2) {
      return NEARLY
    } else if (took <= 25 && attempts <= 4) {
      return KNEW_BUT_FORGOT
    } else {
      return NO_IDEA
    }
  }
}

export default class VocabResponse extends Component {
  state = {
    attempts: 0,
    completed: this.props.completed ? true : false,
    started: this.props.started
  }

  render() {
    const { content, what, onCompleted } = this.props;

    // TODO: handle other types! not just text!
    var onTextAttempt = (correct) => {
      var now = new Date()

      // mark as started if that hasn't happened already
      if (!this.state.started) {
        this.setState({started: now})
      }

      // how long did it take the user to find out the answer?
      var took = (now - this.state.started) / 1000
      if (!took) {
        took = 0
      }

      console.log ('VocabResponse')

      // and mark based on correct/incorrect and time
      if (correct) {
        // onCompleted (textScore (correct, took, this.state.attempts));
        onCompleted (5)
        this.setState ({completed: true});
      } else {
        // after 3 wrong attempts, just move on
        if (this.state.attempts > 4) {
          onCompleted (textScore (correct, took, this.state.attempts));
          this.setState ({completed: true});
        }
      }
    };

    var onDirectAttempt = (score) => {
      this.setState({attempts: this.state.attempts + 1, completed: true})
      onCompleted (score)
    }

    return (
      <div>
      {(() => {
        switch (what) {
          case 'pinyin':
            // TODO: should be PinyinAnswer
            return <TextAnswer placeholder='Pinyin' answers={ this.props.content.pinyin } onSubmit={ onTextAttempt } />
          case 'meaning':
            return <TextAnswer placeholder='Meaning' answers={ this.props.content.meaningAnswers } onSubmit={ onTextAttempt } />
          case 'handwriting':
            return 'HANDWRITING ANSWER'
          default:
            return <UserAnswer placeholder={ what } onSubmit={ onDirectAttempt } />
        }
      })()}
      </div>
    );
  }
}