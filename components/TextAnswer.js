// has a textbox, compared answer to what was typed
// surely we can ONLY return true/false here
// the scaling of the score must be done by parent

import React, { Component, PropTypes } from 'react'

let TextAnswer = ({placeholder, answers, onSubmit}) => {
  let input

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      if (!input.value.trim()) {
        return
      }

      var correct = answers.some ((val) => {
        return val.toLowerCase() == input.value.toLowerCase();
      })

      onSubmit (correct)
      input.value = ''
    }}>
      <input type='text'
        placeholder={placeholder}
        ref={node => {
              input = node
            }}
          />
    </form>
  )
}

export default TextAnswer