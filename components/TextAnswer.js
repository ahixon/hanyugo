// has a textbox, compared answer to what was typed
// surely we can ONLY return true/false here
// the scaling of the score must be done by parent

import React, { Component, PropTypes } from 'react'

export default class TextAnswer extends Component {
  state = {
    response: '',
    responded: false,
    correct: false
  }

  responseSubmit(e) {
    e.preventDefault()

    if (!this.state.response.trim()) {
      return
    }

    var isCorrect = this.props.answers.some ((val) => {
      return val.toLowerCase() == this.state.response.toLowerCase();
    })

    this.props.onSubmit (isCorrect)
    this.setState ({ correct: isCorrect, responded: true, response: '' })
  }

  responseChange (e) {
    this.setState ({ response: e.target.value })
  }

  render() {
    return (
      <form onSubmit={ this.responseSubmit.bind (this) }>
        <input type='text'
          placeholder={ this.props.placeholder }
          disabled={ this.props.disabled }
          onInput={ this.responseChange.bind (this) }
          value={ this.state.response }
          />
      </form>
    )
  }
}

export default TextAnswer