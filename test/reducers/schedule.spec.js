import { expect } from 'chai'
import schedule, { NEARLY, HARD, GOOD, STEP_INTERVALS } from '../../reducers/schedule'

describe ('schedule', () => {
  const now = new Date ();

  const exp = new Date (now);
  exp.setSeconds (now.getSeconds() + STEP_INTERVALS[0]);

  it('should mark an unstarted card as seen and learning', () => {
    expect(
      schedule({
        nextDue: undefined,
        repetitions: 0,
        ef: 2.5,
        seen: 0,
        lapses: 0,

        type: 'new',
        step: 0,
        interval: undefined
      }, {
        type: 'SCHEDULE_UPDATE',

        payload: {
          score: HARD,
          time: now,
        }
      })
    ).to.eql({
      nextDue: exp,
      repetitions: 0,
      ef: 2.5,
      seen: 1,
      lapses: 0,

      type: 'learning',
      step: 0,
      interval: undefined
    })
  })

  const updated = new Date();

  const justGraduated = {
    nextDue: updated,
    repetitions: 0,
    ef: 2.5,
    seen: 2,
    lapses: 0,

    type: 'reviewing',
    step: -1,
    interval: undefined
  };

  it('should graduate a learning card to reviewing', () => {
    expect(
      schedule({
        nextDue: exp,
        repetitions: 0,
        ef: 2.5,
        seen: 1,
        lapses: 0,

        type: 'learning',
        step: 0,
        interval: undefined
      }, {
        type: 'SCHEDULE_UPDATE',

        payload: {
          score: GOOD,
          time: updated,
        }
      })
    ).to.eql(justGraduated)
  });

  var finalDue = new Date(updated);
  finalDue.setDate (finalDue.getDate () + 1); // 10 day

  it('should convert graduated card to completed, with correct nextDue', () => {
    expect(
      schedule(justGraduated, {
        type: 'SCHEDULE_UPDATE',

        payload: {
          score: GOOD,
          time: updated,
        }
      })
    ).to.eql({
      nextDue: finalDue,
      repetitions: 1,
      ef: 2.5,
      seen: 3,
      lapses: 0,

      type: 'completed',
      step: -1,
      interval: 1
    })
  })

  var lapsedDue = new Date(updated)
  lapsedDue.setSeconds (lapsedDue.getSeconds() + STEP_INTERVALS[STEP_INTERVALS.length - 1])

  it('should change graduated card back to lapsed on wrong answer', () => {
    expect (
      schedule (justGraduated, {
        type: 'SCHEDULE_UPDATE',
        
        payload: {
          score: NEARLY,
          time: updated
        }
      })
    ).to.eql ({
      nextDue: lapsedDue,
      repetitions: 0,
      ef: 2.5,
      seen: 3,
      lapses: 1,

      type: 'lapsed',
      step: 1,
      interval: undefined
    })
  })
})