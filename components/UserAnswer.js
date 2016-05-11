import React, { Component, PropTypes } from 'react'

let UserAnswer = ({completed, placeholder, onSubmit}) => {
  let input

  return (
    <div>{ placeholder }:
      <span>
        <button disabled={completed} onClick={ () => onSubmit(5) }>Easy</button> 
        <button disabled={completed} onClick={ () => onSubmit(4) }>Good</button> 
        <button disabled={completed} onClick={ () => onSubmit(3) }>Hard</button> 
        <button disabled={completed} onClick={ () => onSubmit(2) }>Tip of my tongue</button> 
        <button disabled={completed} onClick={ () => onSubmit(1) }>Knew it, but forgot</button> 
        <button disabled={completed} onClick={ () => onSubmit(0) }>Don't know</button> 
      </span>
    </div>
  )
}

export default UserAnswer