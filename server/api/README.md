# Data types

## User

Represents a user of the system. Either admins or normal users. Maybe moderators too.

* name - actual name of the user
* email
* bio
* nickname - display name
* avatar - may be pulled from gravatar, or customized
* role: admin or user
* following - this user gets updates for activity from these users
* blocked - this user does not get any interaction with these users
* hashedPassword
* salt
* facebook login info
* twitter login info
* google login info
* github login info

## Game

Represents a video game. Obviously.

* title
* publisher
* aliases - other names by which the game is known
* description
* rating - periodically calculated from user reviews
* difficulty - periodically calculated from user reviews
* tags
* updated - history of updates
* active - whether it's included in results

## Tag

Represents a tag - something that can be applied to an object that describes something about that object.

* name
* canonical - the tag that represents "canonical" form of the tag. for instance "massively multiplayer online" might be the canonical form of "mmo" (or vice-versa for brevity)
* description - a short description of what the tag represents
* updated - a history of updates to this tag

## Review

A user's rating and optional extended review of a game. Used to determine recommended games for that user.

* title (optional) - a heading/title for the review
* rating - numeric 1 to 5 rating of the game
* difficulty - numeric 1 to 5 difficulty rating of the game
* length - length to complete the game, a single round/session of a game, or the average length of a play session
* completed - a numeric representation of whether the game was completed 
  * 0 = no
  * 1 = yes
  * -1 = not applicable
* description - user's description of their game experience
* author - the user that wrote the review
* game - the game that is being reviewed
* updated - a history of updates to the review

## Flag

Admin flag for any object. Represents something offensive or illegal about an object.

* by - the user that flagged the object
* on - the date and time of the flag (UTC)
* item - the object that was flagged
* valid
  * true means the flag is meaningful
  * false means that an admin/moderator has determined that there was no reason for the flag 
