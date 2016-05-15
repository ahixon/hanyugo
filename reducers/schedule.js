export const STEP_INTERVALS = [
  60,
  60*10
];

// 5 - perfect response
// 4 - correct response after a hesitation
// 3 - correct response recalled with serious difficulty
// 2 - incorrect response; where the correct one seemed easy to recall 
//     (aka "ah yeah could've gotten that damn it")
// 1 - incorrect response; the correct one remembered
//     (aka "oh yeeeeaaaaaaaah, that's right")
// 0 - complete blackout. (aka "I had no idea")

export const EASY = 5;
export const GOOD = 4;
export const HARD = 3;
export const NEARLY = 2;
export const KNEW_BUT_FORGOT = 1;
export const NO_IDEA = 0; // primarily for "skip"

const updateInterval = (reps, ef) => {
  if (reps <= 0 || !reps) {
    return undefined;
  }

  switch (reps) {
    case 1:
      return 1;
    case 2:
      return 4;
    default:
      return updateInterval (reps - 1, ef) * ef;
  }
}

// valid cards to look at are anything with nextDue <= now or undefined
// all cards should be cleared of completed status on start of review
const schedule = (state = {
  nextDue: null,
  repetitions: 0,
  ef: 2.5,
  seen: 0,
  lapses: 0,

  type: 'new', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
  step: 0,
  interval: null
}, action) => {
  if (!action) {
    return state;
  }
  
  switch (action.type) {
    case 'SCHEDULE_UPDATE':
      var { repetitions, ef, interval, lapses, step, type } = state;

      // wake up card
      type = type == 'new' ? 'learning' : type

      switch (action.payload.score) {
        case EASY:
          // graduate to review
          step = -1
          break;
        case GOOD:
          // reduce step count
          step = Math.max (step - 1, -1)
          break;
        case HARD:
          // keep it where it was
          break;
        default:
          // wrong; max out step count
          step = STEP_INTERVALS.length - 1
          break;
      }

      if (type  == 'learning' || type == 'lapsed') {
        if (step == -1) {
          // convert to review card
          type = 'reviewing';
        }
      } else {
        // cards that are presently a review card but may need updating
        if (step >= 0) {
          // we moved to step > 0, which means we were wrong
          // convert the card to lapsed
          type = 'lapsed';
          lapses++;
        } else {
          // no more steps remain, and we were correct this time
          // so convert to completed
          type = 'completed'
        }
      }

      // reschedule next due factors and time
      // only update ef/reps if we *were* a review card
      if (state.type == 'reviewing') {
        if (action.payload.score < HARD) {
          // answer was wrong, reset repetition count
          repetitions = 0;
        } else {
          // answer correct, update ease factor
          ef = ef + (0.1 - (5 - action.payload.score) * (0.08 + (5 - action.payload.score) * 0.02));
          ef = ef < 1.3 ? 1.3 : ef; // clamp
          repetitions++;
        }
      }

      // next due is dependent on if we are in a step for
      // lapsed/learning cards or regular review cards
      var next_due;
      if (type != 'completed') {
        if (step >= 0) {
          next_due = new Date(action.payload.time);
          next_due.setSeconds (action.payload.time.getSeconds() + STEP_INTERVALS[step]);
        } else {
          // make it due immediately
          next_due = action.payload.time;
        }
      } else {
        // update interval
        interval = updateInterval (repetitions, ef);

        next_due = new Date(action.payload.time);
        next_due.setDate (action.payload.time.getDate() + interval);
      }

      return {
        type,
        step,
        repetitions,
        nextDue: next_due,
        interval,
        lapses,
        seen: state.seen + 1,
        ef
      }
    default:
      return state
  }
}

export default schedule