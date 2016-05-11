import expect from 'expect'
import card from '../../reducers/card'

describe('card reducer', () => {
  it('should handle initial state', () => {
    expect(
      card(undefined, {})
    ).toEqual({})
  })

  it('should handle ADD_CARD', () => {
    expect(
      cards({}, {
        type: 'ADD_CARD',
        card: {
          frontType: 'pinyin',
          backType: 'meaning',

          contentId: 0,
          groupId: 0,

          front: ['hao'],
          back: ['good']
        }
      })
    ).toEqual({
      0: {
        frontType: 'pinyin',
        front: ['hao'],

        backType: 'meaning',
        back: ['good'],

        contentId: 0,
        groupId: 0,

        // scheduling
        nextDue: undefined,
        repetitions: 0,
        ef: 2.5,
        seen: 0,
        lapses: 0,

        type: 'new', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 0,
        interval: undefined
      }
    })
  })

})
