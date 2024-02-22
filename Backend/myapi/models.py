from django.db import models

# Create your models here.
'''
Good documentation: https://www.freecodecamp.org/news/common-django-model-fields-and-their-use-cases/
                    https://radixweb.com/blog/create-rest-api-using-django-rest-framework
Django models are a powerful abstraction that simplifies the tasks of 
creating, reading, updating, and deleting database records,
as well as managing database schemas.

- Database Schema Definition: 

- Data Manipulation and Retrieval:

- Validation: Models can include validation rules for their fields, 
    ensuring that the data stored in your database is consistent and follows the defined constraints.
    
- Relationships: Models can define various types of relationships between tables,
    such as one-to-many, many-to-many, and one-to-one relationships
    
- Custom Methods: Models can have custom methods that add functionality related to the data.

- Admin Interface Integration:

- Migrations: Django models are used with Django's migration system to automatically generate migrations files (which are Python scripts). 
    These migrations are used to evolve your database schema over time as you change your models
'''

class User(models.Model):
    userID = models.CharField(max_length=50,primary_key=True)
    

class QuestType(models.Model):
    questTypeID = models.BigAutoField(primary_key=True)
    typeName = models.CharField(max_length=80)
    typeDescription = models.CharField(max_length=150)
    
class Quest(models.Model):
    questID = models.BigAutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.PROTECT)
    questTypeID = models.ForeignKey(QuestType, on_delete=models.PROTECT)
    quest_name = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True)
    Task = models.CharField(max_length=150)
    state = models.BooleanField(default=False)
    
