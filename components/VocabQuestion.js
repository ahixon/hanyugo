// Just asks the user a thing

import React from 'react'

let VocabQuestion = ({ content, what }) => (
  <span>{(() => {
    switch (what) {
      case 'pinyin':
        return content.pinyin.join (' or ')
      case 'meaning':
        return content.meaning.join ('; ')
      case 'character':
        return content.hanziSimp
      case 'audio':
        return "AUDIO PLAYER"
      case 'handwriting':
        return "HANDWRITING QUESTION"
      default:
        return "Don't know how to ask about a vocab word's " + what.toString()
    }
  })()}</span>
)

export default VocabQuestion