// use usn for cache?
// is there a moduel that lets us do this for us?

obj = {contentId, text} // - can use interpolation in text? why not just make text always interpolated? eg <Content id="">

review:
  // usn: 0,
  // increases per review started AND completed;
  // if we are the same or ahead of server, then we are out of sync and another device has done or started a review
  // they must either finish or we throw away their data and sync ours

  current: {
    currentCard: 0,
    prevCard: 0,

    cardIds: [0, 1], // current card is implicitly first one
    //log: [
    // {
      currentCard: 0,
      currentSchedule: { .. }
      prevCard: undefined,

    // },
    //],
    // added to log prior to action completition, so that we know
    // what card state to roll back to. cannot roll back first element,
    // otherwise we lose initial state (unless stored elsewhere)

    start: null,
    finish: null
  },

  previous: [Review]
  // previous reviews; so we can see how long they were/what cards we were reviewing
  // things get moved here once they have "finished"
},

content: {
  data: {
    0: {
      usn: 0,
      levelTextbook: 0,
      levelVocab: 0,

      hanziSimp: '',
      hanziTrad: '',

      pinyin: [''], // since a word can -- but thankfully, not often -- be pronounced multiple ways

      meaning: [],
      meaningAnswers: [], // what the user could type in for meaning; we only check THIS for answers
      // userAnswers: [       // answers from other users
      //   { userId: 3, answers: ['blahblah'],  }
      // ]

      learnable: false,
      info: '',
      audio: '',

      frame: undefined,
      strokeCount: undefined
    },

    usn: 0
  },

  activities: {
    0: {
      usn: 0,
      type: 'rearrange',
      text: 'Rearrange into reverse alphabetical order.',
      tokens: [ { contentId: ['a', 'b', 'c' ],
      correct: ['c', 'b', 'a']
    },

    1: {
      usn: 0,
      type: 'select',
      text: 'Which letters come after A?',
      options: [
        { obj, correct: false },
        { obj, correct: true },
        { obj, correct: true },
      ]
    },

    usn: 0
  }

  // (tokenised) reverse lookup (for synonyms)
  meaningAnswers: {
    'defn': [contentId]
  }

  // reverse lookup (for homonyms)
  pinyin: {
    'hao': [ 0 ]
  }

  pinyinAtonal: {
    'hao': [ 0 ]
  }
}

cards: {
  0: {
    groupId: 0,

    topic: 'vocab',

    // rendered by VocabCard (has front/back), ActivityCard (front only), SentenceCard (comprehension [f/b]/reordering [f only])
    // Full text comphrension (ie stories) can be assembled by a Quiz containing Activities about the sentence
    // Activites may or may not enable adding as an SRS card.
    //
    // NB: pinyin/audio front ONLY is bad; must always be paired with another thing
    content: {
      contentId: 0,
      front: ['pinyin', 'meaning'], // pinyin, character
      back: ['handwriting', 'audio'],
    }

    content: 5,
    // if we have multiple back type, surely a reduction in ef means all other related
    // cards in card group should have reduced ef? take avg? change ef by same amount
    // and update intervals + dues?

    // BETTER YET: cardGroup has own EF, and each card has own EF, and we take some
    // weighted average of the two.

    schedule: {
      nextDue: undefined,
      repetitions: 0,
      ef: 2.5,
      seen: 0,
      lapses: 0,

      type: 'new', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
      step: 0,
      interval: undefined
    }
  }
}