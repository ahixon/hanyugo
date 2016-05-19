
* consider the use case when someone has stopped using it for a while
	- automatically put user into hiatus when they haven't logged in for more than X days?
		(modify item updates on login trigger?)

	- that should prevent the build-up of to-be-learnt and to-be-reviewed items, but depending
	  on the length of time, the user may have forgotten a bunch of the hanzi.

	  simply apply a penalisation to all cards relative to the number of days since the last
	  review (or something like that). would need to provide a ceiling to this though; you're
	  unlikely to forget cards that are considered "expert", but anything less than that
	  would have varying levels of forgetfulness.

* vocabulary
	- will need to be determined by level of containing characters

	- problem: if the level of a containing character changes, the vocab level also needs
	  to change. we can fix this by:
	  	- consistency check
	  	- update hook on included by and includes

* hanzi
	- can be learned via:
		+ concept grouping - Remember Simplified Hanzi; Chinese Characters: Learn and Remember
		+ radical grouping, based on stroke count - Wanikani
			- the problem here is that you will have a large number of characters at 4-8
			  strokes, so these will need to be broken up into different levels (presumably
			  arbitrarily).

	- in both the above cases, we have the issue that we won't learn characters of the
	  vocabulary words we're learning simultaneously (most of them are learnt much later).

	  are the lessons re-orderable without too many side effects?
	  	+ sort of, but you still have dependencies
	  		eg, RSH:  xiexie is frame 1030 (lesson 33), which needs shoot (1029 / 33) and words/talk (354 / 15), which in turn requires words and tongue
	  		    CCLR: xiexie is frame 1634 (lesson 66), which needs [to] shoot (? / ?) and speech (? / ?), which in turn requires 

	  should we just throw those vocab words in without regard to the rest of the plan, since
	  there -- in theory -- won't be too many of them?
	  	+ can't do this unfortunately, since many have multiple characters and we don't know
	  	  both to learn the word itself.

	- will need to add pronunciation to the stories (but *not* tones; those must be learnt with
	  the pronunciation as a single unit).

	- will need to learn additional vocabulary words NOT included in those books that are
	  combinations of other characters. We can pull this from CCDICT. We will equally have to
	  write our own stories.

	- how to describe the relation between a character and its primitive/radical?
		+ RSH do this in the description if a character is used as both, otherwise they teach it separately
		+ we should teach separately? sure why not, just link back to the character at hand (and mention the
		  relationship in both stories).