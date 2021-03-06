//obj = {contentId, text} // - can use interpolation in text? why not just make text always interpolated? eg <Content id="">

const testStore = {
  data: {
    vocab: {
      0: {
        id: 0,
        levelTextbook: 0,
        levelVocab: 0,

        hanziSimp: '好',
        hanziTrad: '好',

        pinyin: ['hao'],

        meaning: ['good'],
        meaningAnswers: ['good', 'happy'],
        // userAnswers

        learnable: true,
        info: 'Means both happy, and can be used to join a noun and adjective.',
        audio: 'hao.wav',

        frame: null,
        strokeCount: 8
      },

      1: {
        id: 1,
        levelTextbook: 0,
        levelVocab: 0,
        hanziSimp: '是',
        hanziTrad: '是',

        pinyin: ['shi'],

        meaning: ['is'],
        meaningAnswers: ['is', 'being'],

        learnable: true,
        info: null,
        audio: 'shi.wav',

        frame: null,
        strokeCount: null
      }
    },

    activities: {
      // 0: {
      //   usn: 0,
      //   id: 0,
      //   type: 'rearrange',
      //   text: 'Rearrange into reverse alphabetical order.',
      //   tokens: [ { contentId: ['a', 'b', 'c' ],
      //   correct: ['c', 'b', 'a']
      // },

      // 1: {
      //   usn: 0,
      //   id: 1,
      //   type: 'select',
      //   text: 'Which letters come after A?',
      //   options: [
      //     { obj, correct: false },
      //     { obj, correct: true },
      //     { obj, correct: true },
      //   ]
      // },
    },

    meaningAnswers: { },

    pinyin: {
      'hao': [ 0 ]
    },

    pinyinAtonal: {
      'hao': [ 0 ]
    }
  },

  cards: {
    0: {
      id: 0,

      type: 'vocab',
      // VocabCard (has front/back), ActivityCard (front only), SentenceCard (comprehension [f/b]/reordering [f only])

      data: {
        contentId: 0,
        // Full text comphrension (ie stories) can be assembled by a Quiz containing Activities about the sentence
        // Activites themselves may or may not enable adding as an SRS card.
        //
        // NB: pinyin/audio front ONLY is bad; must always be paired with another thing
        front: ['character', 'pinyin'], // pinyin, character
        back: 'meaning',
      },

      schedule: {
        nextDue: null,
        repetitions: 0,
        ef: 2.5,
        seen: 0,
        lapses: 0,

        type: 'new', // ('new', 'learning', 'reviewing', 'lapsed', 'completed')
        step: 0,
        interval: null
      },
    },

    1: {
      id: 1,
      type: 'vocab',
      data: {
        contentId: 1,
        front: ['meaning'],
        back: ['pinyin'], 
      },

      schedule: {
        nextDue: null,
        repetitions: 0,
        ef: 2.5,
        seen: 0,
        lapses: 0,

        type: 'new',
        step: 0,
        interval: null
      },
    },

    contentIdToCardId: {
      0: [0]
    },

    activityIdToCardId: {},
    sentenceIdToCardId: {}
  }
}

export default testStore

// review:
  // usn: 0,
  // increases per review started AND completed;
  // if we are the same or ahead of server, then we are out of sync and another device has done or started a review
  // they must either finish or we throw away their data and sync ours
