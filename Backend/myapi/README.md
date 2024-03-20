# JSON POST REQUESTS FORMAT

## To add a new UserProfile, your JSON payload should look like this:

Endpoint : api/account/users/

{
  "username" : "user213",
  "first_name" : "Jhon",
  "last_name" : "ripley",
  'email" : "adas@dasd.com",
  "bio" : "test bio",
  "password" : "adsa"
}


---------------------------------------------------------------------------

## To modify a UserProfile, your JSON payload should look like this:

Endpoint : api/account/users/

{ 
"imgURL" : "api/media/images/dasda.jpg",
"first_name": "Kyky",
"last_name": "Mbape",
"birthday": "2004-10-20",
"bio" : "i just changed my bio"
}

---------------------------------------------------------------------------

## To add a new Quest, use the following JSON structure:

Endpoint : api/quest/add/

{
  "user" : 1,
  "questTypeID" : 1,
  "locationID" : 1,
  "name": "Quest Name",
  "task": "Task Description",
  "reward" : 40,
  "state": "False"
  "imgURL" : "adad/dada/ad.jpg"
}

----------------------------------------------------------------------------

## To create a new Society, the JSON should be formatted as follows:

Endpoint : api/society/add/

{
  "name": "Society Name",
  "description": "A description of the society"
}

----------------------------------------------------------------------------------

## When adding a new Membership, format your JSON like this:

Endpoint : api/society/membership/add/

{
  "user": "UserID",
  "societyID": "SocietyID",
  "state": "Membership State"
}

------------------------------------------------------------------------------------

## To get the n best users, the JSON should be formatted as follows:

Endpoint : api/leaderboard_n/

{
  "n": 5
}

------------------------------------------------------------------------------------

## To get the n best users WITHIN YOUR FRIENDS, the JSON should be formatted as follows:

Endpoint : api/friends/leaderboard_n/

{
  "n": 5
}

------------------------------------------------------------------------------------

## To add a new QuestType, use the following JSON structure:

Endpoint : api/quest/type/add

{
  "name": "Double XP",
  "description" : "this is a for quests that have double xp"
}

-------------------------------------------------------------------------------------

## To add a location, the JSON should be formatted as follows:

Endpoint : api/quest/location/add

{
  "name" : "park",
  "latitude" : 12323.2121,
  "longitude" : -74.0060
}

-------------------------------------------------------------------------------------

## To upload an image, the multipart/form-data should be formatted as follows:

Endpoint : api/media/images/upload

{
  "image" : "image_field.jpg",
  "name" : "image name",
  "description" : "this is the description of the image"
}

-------------------------------------------------------------------------------------

## To add a friend, the JSON should be formatted as follows:

Endpoint : api/friends/add/

{
  "user1" : 1,
  "user2" : 2
}

-------------------------------------------------------------------------------------

## To add a quest submission, the JSON should be formatted as follows:

Endpoint : api/quest/submissions/add

{
  "questID" : "2",
  "user" : "2",
  "imgURL" : "sfds/asd.jpg",
  "info" : "this is a sub for a quest",
  "verified" : "False"
}

-------------------------------------------------------------------------------------

## To get all friends of a user, the JSON should be formatted as follows:

Endpoint : api/friends/all/

------------------------------------------------------------------------------------

## To get the 10 best users, the JSON should be formatted as follows:

Endpoint : api/leaderboard_10/

------------------------------------------------------------------------------------

## To get the n best users WITHIN YOUR FRIENDS, the JSON should be formatted as follows:

Endpoint : api/friends/leaderboard_n/

------------------------------------------------------------------------------------

## To get all users, the JSON should be formatted as follows:

Endpoint : api/users/

------------------------------------------------------------------------------------

## To get all images, the JSON should be formatted as follows:

Endpoint : api/media/images/

------------------------------------------------------------------------------------

## To get all members of a soceity, the JSON should be formatted as follows:

Endpoint : api/society/membership/

------------------------------------------------------------------------------------

## To validate a quest submission, the JSON should be formatted as follows:

Endpoint: api/quest/submissions/validate

{
  "id": 1
}
