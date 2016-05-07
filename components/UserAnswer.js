import React, { Component, PropTypes } from 'react'

let UserAnswer = ({placeholder, onSubmit}) => {
  let input

  return (
    <div>{ placeholder }:
      <span>
        <button onClick={ () => onSubmit(5) }>Easy</button> 
        <button onClick={ () => onSubmit(4) }>Good</button> 
        <button onClick={ () => onSubmit(3) }>Hard</button> 
        <button onClick={ () => onSubmit(2) }>Tip of my tongue</button> 
        <button onClick={ () => onSubmit(1) }>Knew it, but forgot</button> 
        <button onClick={ () => onSubmit(0) }>Don't know</button> 
      </span>
    </div>
  )
}

export default UserAnswer