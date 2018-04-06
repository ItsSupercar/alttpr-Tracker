//NOTES ON THE LOGIC

for all modes, dungeon chest logic is determined using a "max" value (which represents the best-case scenario where the player finds as many items as possible) and a "min" value (which represents the worst-case scenario where they find the least). this is then visually represented by the pips on the map. items behind dark rooms are counted for the max value but not for the min value.

the green pips represent the number of items you're guaranteed to find. 
the yellow pips represent the number of items you may or may not find, depending on luck and/or door choice.
the red pips represent the number of items you can't get at all.

the pips only represent quantities; they aren't necessarily tied to specific chests. if there are two doors that each contain an item, and you only have one key, then the tracker knows you can definitely get one of them (and thus will display 1 green pip) but it doesn't know WHICH one you'll get.

KEYSANITY
in keysanity, it's easier to itemize chests, because the player counts ALL chests in this mode; accessing a particular chest means you definitely get an item from it, so it's generally sufficient to tally up the availability requirements of each chest

the "max" value assumes the most effective key use to open as many chests as you can.
the "min" value assumes poor key use that nets you the least chests (with exceptions*)

*for example, the tracker does not assume you'll do something like go all the way to the end of skull woods, get the key from the gibdo, then turn around and waste it somewhere else in the dungeon. however, the tracker DOES account for the possibility that you might waste a small key going toward the PoD boss without also having the big key that you need


NON-KEYSANITY
in normal or retro, it's a little trickier because the tracker has to account for chests possibly not containing items. so in these modes, the notes instead tend to refer to best/worst case scenarios about where the items could land. 
the "max" value assumes you have the best luck and find as many items as logically possible in the chests you can get to.
the "min" value assumes you have the worst luck and find maps/compasses/keys before the good stuff.

dungeons that have multiple options for key use are the most complicated-- PoD is notorious, but ganon's tower is even more troublesome (even if that dungeon's item logic is relatively unimportant by the time you reach the endgame). for these dungeons in non-keysanity modes, a single logical check might be linked to a variety of different chests, which could be mutually exclusive or inclusive. this makes it pretty hard to annotate the logic as a whole