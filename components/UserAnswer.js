import React, { Component, PropTypes } from 'react'

let UserAnswer = ({disabled, placeholder, onSubmit}) => {
  let input

  return (
    <div>{ placeholder }:
      <ul>
        <li><button disabled={disabled} onClick={ () => onSubmit(5) }>Easy</button></li>
        <li><button disabled={disabled} onClick={ () => onSubmit(4) }>Good</button></li>
        <li><button disabled={disabled} onClick={ () => onSubmit(3) }>Hard</button></li>
        <li><button disabled={disabled} onClick={ () => onSubmit(2) }>Almost</button></li>
        <li><button disabled={disabled} onClick={ () => onSubmit(0) }>Don't know</button></li>
      </ul>
    </div>
  )
}

export default UserAnswer