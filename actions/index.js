let nextCardId = 0
export const addCard = (card) => {
  return {
    type: 'ADD_CARD',
    id: nextCardId++,
    card
  }
}