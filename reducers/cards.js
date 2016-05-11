import card from './cards'

const cards = (state = {
  contentIdToCardId: {},
  // activityIdToCardId: {},
  // sentenceIdToCardId: {},
}, action) => {
  switch (action) {
    const cardId = action.payload.id;

    case 'CARD_ADD':
      return Object.assign({}, state, {
        [ cardId ]: card (null, action)
        contentIdToCardId: contentCardMap (state.contentIdToCardId, action.payload)
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
            contentIdToCardId[oldContentId] = contentIdToCardId[oldContentId].filter (someCardId => someCardId != cardId)
          }

          // add new one
          contentIdToCardId[newContentId].push (cardId);
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