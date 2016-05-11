// need to test:
// Y adding a card with no inital type; do the backref entries appear
// Y adding a card with initial type; do the backref entries appear
// Y adding more than one card; do the ids appear correctly
// Y updating the card data; do the backref entries update
// removing a card in the middle
// Y adding a card that already exists; updates old card

import expect from 'expect'
import cards from '../../reducers/cards'
import schedule from '../../reducers/schedule'

describe('cards reducer', () => {
  it('should handle initial state', () => {
    expect(
      cards(undefined, {})
    ).toEqual({
      contentIdToCardId: {}
    })
  })

  it('should add card with no initial type', () => {
    expect(
      cards(cards(undefined, {}), {
        type: 'CARD_ADD',
        payload: {
          id: 0
        }
      })
    ).toEqual ({
      0: {
        id: 0,
        type: null,
        data: null,
        schedule: schedule(undefined, {})
      },

      contentIdToCardId: {}
    })
  })

  it('should add card (and reverse lookup) with vocab initial type', () => {
    expect(
      cards(cards(undefined, {}), {
        type: 'CARD_ADD',
        payload: {
          id: 1,
          type: 'vocab',
          data: {
            contentId: 5
          }
        }
      })
    ).toEqual ({
      1: {
        id: 1,

        type: 'vocab',
        data: {
          contentId: 5
        },
        schedule: schedule(undefined, {})
      },

      contentIdToCardId: { 5: [ 1 ] }
    })
  })

  it('should allow adding two cards', () => {
    expect(
      cards({
        1: {
          id: 1,

          type: 'vocab',
          data: {
            contentId: 5
          },
          schedule: schedule(undefined, {})
        },

        contentIdToCardId: { 5: [ 1 ] }
      }, {
        type: 'CARD_ADD',
        payload: {
          id: 42,
          type: 'vocab',
          data: {
            contentId: 5
          }
        }
      })
    ).toEqual ({
      1: {
        id: 1,

        type: 'vocab',
        data: {
          contentId: 5
        },
        schedule: schedule(undefined, {})
      },

      42: {
        id: 42,

        type: 'vocab',
        data: {
          contentId: 5
        },
        schedule: schedule(undefined, {})
      },

      contentIdToCardId: { 5: [ 1, 42 ] }
    })
  })

  it('should update reverse lookup on contentId change', () => {
    expect(
      cards({
        1: {
          id: 1,

          type: 'vocab',
          data: {
            contentId: 5
          },
          schedule: schedule(undefined, {})
        },

        contentIdToCardId: { 5: [ 1 ] }
      }, {
        type: 'CARD_SET_DATA',
        payload: {
          id: 1,
          data: {
            contentId: 42
          }
        }
      })
    ).toEqual ({
      1: {
        id: 1,

        type: 'vocab',
        data: {
          contentId: 42
        },
        schedule: schedule(undefined, {})
      },

      contentIdToCardId: { 5: [], 42: [ 1 ] }
    })
  })

  it('should update reverse lookup on contentId change (many)', () => {
    expect(
      cards({
        1: {
          id: 1,

          type: 'vocab',
          data: {
            contentId: 5
          },
          schedule: schedule(undefined, {})
        },

        2: {
          id: 2,

          type: 'vocab',
          data: {
            contentId: 5
          },
          schedule: schedule(undefined, {})
        },

        contentIdToCardId: { 5: [ 1, 2 ] }
      }, {
        type: 'CARD_SET_DATA',
        payload: {
          id: 1,
          data: {
            contentId: 42
          }
        }
      })
    ).toEqual ({
      1: {
        id: 1,

        type: 'vocab',
        data: {
          contentId: 42
        },
        schedule: schedule(undefined, {})
      },

      2: {
        id: 2,

        type: 'vocab',
        data: {
          contentId: 5
        },
        schedule: schedule(undefined, {})
      },

      contentIdToCardId: { 5: [ 2 ], 42: [ 1 ] }
    })
  })

  it('should replace card that already exists with same ID', () => {
    expect(
      cards({
        1: {
          id: 1,

          type: 'vocab',
          data: {
            contentId: 42
          },
          schedule: schedule(undefined, {})
        },

        contentIdToCardId: { 42: [ 1 ] }
      }, {
        type: 'CARD_ADD',
        payload: {
          id: 1,
          type: 'vocab',
          data: {
            contentId: 5,
            new: true,
          }
        }
      })
    ).toEqual ({
      1: {
        id: 1,

        type: 'vocab',
        data: {
          contentId: 5,
          new: true
        },

        schedule: schedule(undefined, {})
      },

      contentIdToCardId: { 42: [], 5: [ 1 ] }
    })
  })

})