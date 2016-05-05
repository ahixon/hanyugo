import expect from 'expect'
import cards, { HARD, GOOD, STEP_INTERVALS } from '../../reducers/cards'

describe('card reducer', () => {
  it('should handle initial state', () => {
    expect(
      cards(undefined, {})
    ).toEqual({})
  })

  const now = new Date ();
  const exp = new Date (now);
  exp.setSeconds (now.getSeconds() + STEP_INTERVALS[0]);

  it('should handle ADD_CARD', () => {
    expect(
      cards({}, {
        type: 'ADD_CARD',
        card: {
          frontType: 'pinyin',
          backType: 'meaning',

          id: 0,
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

  it('should SCORE an unstarted card', () => {
    expect(
      cards({
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
    }, {
        type: 'SCORE_CARD',

        id: 0,
        score: HARD,
        time: now,
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
        nextDue: exp,
        repetitions: 0,
        ef: 2.5,
        seen: 1,
        lapses: 0,

        type: 'learning', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 0,
        interval: undefined
      }
    })
  })

  const updated = new Date();

  const justGraduated = {
    0: {
      frontType: 'pinyin',
      front: ['hao'],

      backType: 'meaning',
      back: ['good'],

      contentId: 0,
      groupId: 0,

      // scheduling
      nextDue: updated,
      repetitions: 0,
      ef: 2.5,
      seen: 2,
      lapses: 0,

      type: 'reviewing', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
      step: -1,
      interval: undefined
    }
  };

  it('should SCORE_CARD a started card', () => {
    expect(
      cards({
      0: {
        frontType: 'pinyin',
        front: ['hao'],

        backType: 'meaning',
        back: ['good'],

        contentId: 0,
        groupId: 0,

        // scheduling
        nextDue: exp,
        repetitions: 0,
        ef: 2.5,
        seen: 1,
        lapses: 0,

        type: 'learning', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 0,
        interval: undefined
      }
    }, {
        type: 'SCORE_CARD',

        id: 0,
        score: GOOD,
        time: updated,
      })
    ).toEqual(justGraduated)
  });

  var finalDue = new Date(updated);
  finalDue.setDate (finalDue.getDate () + 1); // 10 day

  it('should convert graduated card to completed', () => {
    expect(
      cards(justGraduated, {
        type: 'SCORE_CARD',

        id: 0,
        score: GOOD,
        time: updated,
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
        nextDue: finalDue,
        repetitions: 1,
        ef: 2.5,
        seen: 3,
        lapses: 0,

        type: 'completed', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: -1,
        interval: 1
      }
    })
  })

  it('should change graduated card back to lapsed', () => {
    expect (
      cards (justGraduated, {
        type: 'SCORE_CARD',
        id: 0,
        score: 2,
        time: updated
      })
    ).toEqual ({
      0: {
        frontType: 'pinyin',
        front: ['hao'],

        backType: 'meaning',
        back: ['good'],

        contentId: 0,
        groupId: 0,

        // scheduling
        nextDue: updated,
        repetitions: 0,
        ef: 2.5,
        seen: 3,
        lapses: 0,

        type: 'lapsed', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 1,
        interval: undefined
      }
    })
  })

})
