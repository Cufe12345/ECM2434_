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

## To add a new Quest, use the following JSON structure:

Endpoint : api/quest/add/

{
  "name": "Quest Name",
  "task": "Task Description",
  "state": False
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

Endpoint : api/quest/location/

{
  "name" : "park",
  "latitude" : 12323.2121,
  "longitude" : -74.0060
}

