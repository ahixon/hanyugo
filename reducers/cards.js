export const STEP_INTERVALS = [
  60,
  60*10
];

export const HARD = 3;
export const GOOD = 4;

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
const card = (state = {}, action) => {
  switch (action.type) {
    case 'SCORE_CARD':
      // wake up card
      var type = state.type == 'new' ? 'learning' : state.type;

      var repetitions = state.repetitions;
      var ef = state.ef;
      var interval = state.interval;

      // TODO: create reviewlog; do this as another action?
      var step = state.step;
      switch (action.score) {
        case 5:
          // easy; graduate to review
          step = -1
          break;
        case 4:
          // good; reduce step count
          step = Math.max (step - 1, -1)
          break;
        case 3:
          // hard; keep it where it was
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
        } else {
          // no more steps remain, and we were correct this time
          // so convert to completed
          type = 'completed'
        }
      }

      // reschedule next due factors and time
      // only update ef/reps if we *were* a review card
      if (state.type == 'reviewing') {
        if (action.score < 3) {
          // answer was wrong, reset repetition count
          repetitions = 0;
        } else {
          // answer correct, update ease factor
          ef = ef + (0.1 - (5 - action.score) * (0.08 + (5 - action.score) * 0.02));
          ef = ef < 1.3 ? 1.3 : ef; // clamp
          repetitions++;
        }
      }

      // next due is dependent on if we are in a step for
      // lapsed/learning cards or regular review cards
      var next_due;
      if (type != 'completed') {
        if (step >= 0) {
          next_due = new Date(action.time);
          next_due.setSeconds (action.time.getSeconds() + STEP_INTERVALS[step]);
        } else {
          // make it due immediately
          next_due = action.time;
        }
      } else {
        // update interval
        interval = updateInterval (repetitions, ef);

        next_due = new Date(action.time);
        next_due.setDate (action.time.getDate() + interval);
      }

      return Object.assign({}, state, {
        type,
        step,
        repetitions,
        nextDue: next_due,
        interval,
        seen: state.seen + 1,
        ef
      })
    default:
      return state
  }
}

const cards = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      var newCard = Object.assign({}, action.card, {
        nextDue: undefined,
        repetitions: 0,
        ef: 2.5,
        seen: 0,
        lapses: 0,

        type: 'new', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 0,
        interval: undefined
      });

      const id = newCard.id;
      delete newCard.id;

      return Object.assign({}, state, {
        [ id ]: newCard
      })
    case 'SCORE_CARD':
      if (!state[action.id]) {
        return state;
      }

      return Object.assign({}, state, {
        [ action.id ]: card (state[action.id], action)
      })
    default:
      return state
  }
}

export default cards