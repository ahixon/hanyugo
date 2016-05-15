import { expect } from 'chai'
import card from '../../reducers/card'
import schedule from '../../reducers/schedule'

describe('card reducer', () => {
  it('should handle initial state', () => {
    expect(
      card(undefined, {})
    ).to.eql({
      id: undefined,
      type: null,
      data: null,
      schedule: schedule(undefined, {})
    })
  })

  it('should handle CARD_SET_TYPE to sentence', () => {
    expect(
      card({
        id: 4,
        type: null,
        data: {},
        schedule: null,
      }, {
        type: 'CARD_SET_TYPE',
        payload: 'vocab'
      })
    ).to.eql({
      id: 4,
      type: 'vocab',
      data: {},
      schedule: null
    })
  })

  it('should handle CARD_SET_DATA on vocab to object', () => {
    expect(
      card({
        id: 4,
        type: 'vocab',
        data: null,
        schedule: null,
      }, {
        type: 'CARD_SET_DATA',
        payload: {
          data: {
            contentId: 5,
            front: [],
            back: []
          }
        }
      })
    ).to.eql({
      id: 4,
      type: 'vocab',
      data: { 
        contentId: 5,
        front: [],
        back: []
      },

      schedule: null
    })
  })

})
