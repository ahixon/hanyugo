import card from './card'

const contentCardMap = (map, card, existingCard) => {
  let newMap = map;

  // delete
  if (existingCard && existingCard.data && existingCard.data.contentId) {
    newMap[existingCard.data.contentId] = newMap[existingCard.data.contentId].filter (oldId => { return oldId != existingCard.id })
  }

  // don't go further if we have nothing to add
  if (!card.data || !card.data.contentId) {
    return newMap;
  }

  const current = newMap[card.data.contentId] ? newMap[card.data.contentId] : [];

  return Object.assign({}, newMap, {
    [ card.data.contentId ]: [...current, card.id]
  })
}

const cards = (state = {
  contentIdToCardId: {},
  // activityIdToCardId: {},
  // sentenceIdToCardId: {},
}, action) => {
  if (!action.type) {
    return state;
  }

  const cardId = action.payload.id;

  switch (action.type) {
    case 'CARD_ADD':
      return Object.assign({}, state, {
        [ cardId ]: card (undefined, action),
        contentIdToCardId: contentCardMap (state.contentIdToCardId, action.payload, state[cardId])
      })
    case 'CARD_SET_DATA':
      var contentIdToCardId = state.contentIdToCardId;

      const newContentId = action.payload.data.contentId;
      if (newContentId && state[cardId].data) {
        // does it need updating?
        const oldContentId = state[cardId].data.contentId;
        if (newContentId != oldContentId) {
          if (oldContentId) {
            // remove old one, which may not exist
            contentIdToCardId[oldContentId] = contentIdToCardId[oldContentId].filter (someCardId => { return someCardId != cardId })
          }

          // add new one
          // FIXME: is this okay? or is this mutating?
          if (contentIdToCardId[newContentId]) {
            contentIdToCardId[newContentId].push (cardId)
          } else {
            contentIdToCardId[newContentId] = [cardId]
          }
        }
      }

      return Object.assign({}, state, {
        [ cardId ]: card (state[cardId], action),
        contentIdToCardId
      })
    case 'CARD_SET_TYPE':
      var contentIdToCardId = state.contentIdToCardId;

      if (state[cardId].data) {
        // does it need updating?
        const oldContentId = state[cardId].data.contentId;
        if (oldContentId && action.payload.type != state[cardId].type) {
          if (oldContentId) {
            // remove old one, which may not exist
            contentIdToCardId[oldContentId] = contentIdToCardId[oldContentId].filter (someCardId => someCardId != cardId)
          }
        }
      }

      return Object.assign({}, state, {
        [ cardId ]: card (state[cardId], action),
        contentIdToCardId
      })
    default:
      return Object.assign({}, state, {
        [ cardId ]: card (state[cardId], action)
      })
  }
}

export default cards