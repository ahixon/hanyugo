# Ideas
There are three ideas that we need to associate with each other:
* Character (reading/writing)
* Pronunciation (speaking/listening)
* Meaning/Idea

There are also orthogonal ways of strengthening these individual ideas; for example, rearranging sentences tests reading/understanding of grammar, or read while speaking.

# Card types
Thus, there are several ways of testing and linking these ideas, both in the written and spoken forms.

## Character (reading) -> Meaning
Display character, type in meaning. Check against list of meanings for word.
Could also randomly pick an image? Or make those separate cards

## Character (writing) -> Meaning
Invalid. Output -> Input makes no sense.

## Character (reading) -> Pronunciation (speaking)
Display character, user speaks out aloud. User should self-confirm that they spoke it correctly (both tone and prounciation). This may change if we apply machine learning to spoken models, though that'll be quite a lot of effort.

## Character (writing) -> Pronunciation (listening)
Doesn't make sense. See Pronunciation (listening) -> Character (writing).

HOWEVER, you COULD in fact do this by doing read aloud activities. The user should listen to themselves say it. I guess we do that in the line above; shadowing should strengthen both listening and speaking at the same time.

The difference from the above point is that it is said/heard when reading. We want to do it when writing, too.

## Pronunciation (speaking) -> Character (reading)
Would be some weird text to speech thing where the user has to read what they're speaking and determine if that's correct. 

So, not really possible.

## Pronunciation (listening) -> Character (writing)
Transcription task. Some limitations:

* user has to be able to write characters, either using paper, or a tablet. Asking them to do this on screen sucks.
* spoken, initially, can't be very fast. Break up words;  generate different speeded cards on similar content difficulty.

See also Meaning -> Character (writing).

## Pronunciation (speaking) -> Meaning
Invalid. Output -> Input makes no sense.

## Pronunciation (listening) -> Meaning
Have audio task, user types in meaning. Check against list of meanings for word.
Maybe the user can pick an image that represents the meaning. This would more likely only work for nouns though.

There are some problems. Initially, this is okay since there is only a small set of words we know, so we attach a default context to them. As the number of words we know grow, any given pronunciation can have many meanings.

This means we have to provide some context, either in the form of a surrounding sentence, or the character this is represented by. We should only display the character if we don't have a choice; that is, if they've learnt another homonym. 

This means a PER-USER dictionary of (tonal) pinyin -> hanzi that has been learnt/unlocked so far should be kept; if the array for that pinyin has more than one element, we must display the hanzi alongside the pinyin.

In the case of a sentence, we already display context so this should be unnecessary. If there are multiple intereprations of the sentence (ie it's a pun) they should also be accepted. Note that sentence responses are freeform anyway so the user can decide how correct they were.

## Meaning -> Pronunciation (speaking)
User needs to say it aloud, and we check their prounciation. Currntly, this is done manually. Would be nice to have some sort of machine learning thing check this back against the word.

On answer submission, we play the audio file we thought was attached to that meaning. See the above point about issues with this. Likewise, if we have a word that means the same thing, we MIGHT need to attach the hanzi to the question.

However, unlike prounciation, there is a lot more variation with, and thus, less overlap, with meaning association. There are less words than mean a specific thing with all (or lack of) nuances. If we have two words meaning good, eg 好 and 良好, the latter means favourable whereas the former is more catch-all. 

The question should reflect this, and so we shouldn't need to worry with displaying hanzi. HOWEVER, we should *still* accept close synonyms. This may be open to interpretation, so user answers will be important here.

## Meaning -> Pronunciation (listening)
Invalid. Input -> Input makes no sense.

## Meaning -> Character (reading)
Invalid. Input -> Input makes no sense.

## Meaning -> Character (writing)
We need them to write the character. We should do both:
* stroke correctness, and 
* character ledgibility.

Will likely need to train an RNN for this, since the existing JS project kinda sucks a bit. But happy to try without. 

macbook/other touch computers -- click over handwriting box, draw character (mouse-move), touch again to exit
ipad/phones - same deal, minus click-ness.

If we're without a touch screen device, then we wouldn't expect a user to draw with a mouse. Fuck that. Skip these tasks? Or provide a multiple choice option/scroll through and find.


# Valid front/back combinations

* Read hanzi -> Meaning, textual OR Read hanzi -> Meaning, media
* Read hanzi -> Spoken (via shadowing/listen back; in future, neural nets?)
* Listening -> Write hanzi, touchpad OR Listening -> Write hanzi, multiple choice
* Listening -> Meaning, textual OR Listening -> Meaning, media
* Meaning, textual OR Meaning, media -> Spoken (via shadowing/listen back)
* Meaning, textual OR Meaning, media -> Write hanzi, touchpad OR Write hanzi, multiple choice

# Widgets needed

* Read hanzi - HanziQuestion
* Meaning, textual - TextQuestion
* Meaning, textual - TextResponse (just a textbox; rename TextAnswer)
* Meaning, media - MediaQuestion
* Meaning, media - MediaResponse (scrollable and selectable widget, ability to upload user images, but this can be done on the Answer widget instead)
* Spoken (via shadowing/listen back) - a play/record widget, with a Show Answer button - NEEDS TO TIE IN WITH ANSWER WIDGET (RecordResponse for Q, ShadowWidget for A)
* Write hanzi, multiple choice - lock-style widget - HanziTumbler for Q
* Write hanzi, touchpad - see mockups - HanziScribbler for Q
* Listening - AudioQuestion


Answer widgets?
Done(ish). Reminder that the Response should be in charge of displaying the Answer as well. However, the response component can be its own thing.