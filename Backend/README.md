# Backend Server Setup

This document outlines the steps required to set up and run the backend server for the project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python 3.8 or higher
- pip (Python package installer)

## Installation Steps

1. **Clone the Repository**

   If you have not already, clone the project repository to your local machine.

   ```sh
   git clone <[repository_url](https://github.com/Cufe12345/ECM2434_)>
   cd path/to/backend
   
2. **Install Required Packages**

    run : pip install django djangorestframework djangorestframework-simplejwt djoser django-cors-headers django-extensions Pillow
   
3. **Apply Migrations**
   
    python manage.py makemigrations myapi
    python manage.py migrate

4. **Run the Server**
   
    python manage.py runserver
   
## Database Models

The backend server uses the following Django models to structure the database:

- `UserProfile`: Extends the default user model to include additional fields like `email`, `birthday`, `bio`, `rank`, and `XP`. The `email` field is unique across users.

- `Friend`: Represents a friendship relationship between two `UserProfile` instances. It includes two foreign keys that refer to the `UserProfile` model.

- `QuestType`: Describes different types of quests with a unique `name` and a `description`.

- `Location`: Captures geographical locations with `latitude` and `longitude` coordinates.

- `Quest`: Represents a quest with relationships to `UserProfile`, `QuestType`, and `Location`. It includes details like `name`, `task`, `reward`, and `state`.

- `Image`: Stores image files with an associated `name` and `description`.

- `Society`: Defines a society or group with a `name`, `description`, `numberOfMembers`, and `societyXP`.

- `Membership`: Represents a user's membership in a society, with foreign keys to both `Society` and `UserProfile`.

Each model includes a `__str__` method to provide a human-readable representation of the model instances, which is particularly useful in the Django admin interface.

### Special Model Methods

- The `Friend` model includes a `clean` method to ensure that a user cannot be friends with themselves. It also overrides the `save` method to enforce this validation at the database level.


