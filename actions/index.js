let nextCardId = 0
export const addCard = (card) => {
  return {
    type: 'ADD_CARD',
    id: nextCardId++,
    card
  }
}

export const scoreCard = (id, score, time) => {
  return  {
    type: 'SCHEDULE_UPDATE',
    payload: {
      id,
      score,
      time
    }
  }
}