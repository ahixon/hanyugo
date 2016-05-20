# Scoring

One input to the SRS scheduling algorithm is a card's ease-factors (EF). This value is an accumulator of a card's historical difficulty.

To have more accurate scheduling (ie show a card when it's *almost* about to be forgotten), we would like the ability to more accurately determine a card's EF, rather than basing it entirely on "right" or "wrong" responses.

The method for automatically determining how well the user knew the content on the card will differ from card type to card type. For some card types, we cannot attempt to guess the card's EF, and so will ask the user (either after or instead of getting an answer).

## TextResponse

This is for both pinyin and meaning responses.

Correct:
| Score | Requirements                   |
| ----- | ------------------------------ |
|   5   | Took < n seconds               |
|   4   | Took > n seconds, < 2n seconds |
|   3   | Took > 2n seconds              |

where n is the number of characters in the response.

Incorrect:
| Score | Requirements                   |
| ----- | ------------------------------ |
|   2   | Levenshtein distance of 1      |
|   1   | "Knew, but forgot" button      |
|   0   | "OK, thanks" button            |

## MediaResponse

This is the one where you click on some media instead of typing it (which is TextResponse).

Correct:
| Score | Requirements                   |
| ----- | ------------------------------ |
|   5   | Took < n seconds               |
|   4   | Took > n seconds, < 2n seconds |
|   3   | Took > 2n seconds              |

where n is the number of items being displayed in the MediaResponse.

Incorrect:
| Score | Requirements                   |
| ----- | ------------------------------ |
|   2   |                                |
|   1   | "Knew, but forgot" button      |
|   0   | "OK, thanks" button            |

## HanziScribbler

Here, the user writes in hanzi on their touch screen device or tablet.

We need to keep track of whether the character was legible (by feeding it to our neural network and getting a score back for it), as well as whether the stroke ordering was correct (using Make Me a Hanzi).

Would actually be an ensemble of Make Me a Hanzi demo (which seems to provide the stroke basedon its order and stroke length) and the machine learning model.

Initially, just use the Make Me a Hanzi library and the following table breakdown.

**Note that scores should be averaged over all the characters.**

Correct:
| Score | Requirements                        |
| ----- | ----------------------------------- |
|   5   | In location #1 of stroke results.   |
|   4   | In location #2-3 of stroke results. |
|   3   | In location #3-5 of stroke results. |

Later, when model is trained, integrate deep learning model to score what it ACTUALLY looks like. This will also allow us to do better handwriting drills.

## HanziTumbler

## Everything else

Other Response types we cannot automatically guess a card score. So, the user must manually record how they went.

First, we ask the user if they got it right/wrong. If right, we ask "good/easy/hard". If wrong, we ask "Almost/Remembered/Forgot". **TODO: this wording sucks!**