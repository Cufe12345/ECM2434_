# JSON POST REQUESTS FORMAT

## To add a new UserProfile, your JSON payload should look like this:

Endpoint : api/user/add/

{
  "user": {
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com"
  },
  "birthday": "1990-01-01",
  "bio": "A short bio here",
  "rank": 1
  "XP" : 123

}

---------------------------------------------------------------------------

## To add a new Quest, use the following JSON structure:

Endpoint : api/quest/add/

{
  "name": "Quest Name",
  "task": "Task Description",
  "state": "Initial State"
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
