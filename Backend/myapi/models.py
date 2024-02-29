from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser

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


class UserProfile(AbstractUser):
    email = models.EmailField(unique=True)
    birthday = models.DateField(null=True, blank=True)
    bio = models.CharField(max_length=150, default="")
    rank = models.PositiveIntegerField(default=1)
    XP = models.PositiveIntegerField(default=0)

class Friend(models.Model):
    user1 = models.ForeignKey(UserProfile, related_name='friends_user1',on_delete=models.CASCADE)
    user2 = models.ForeignKey(UserProfile, related_name='friends_user2',on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user1.id} |  {self.user2.id}"
    
    def clean(self):
        # Check if user1 is the same as user2
        if self.user1 == self.user2:
            raise ValidationError("user1 and user2 cannot be the same.")
        
    def save(self, *args, **kwargs): 
        self.clean()
        super(Friend, self).save(*args, **kwargs)


class QuestType(models.Model):
    questTypeID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=80, unique=True)
    description = models.CharField(max_length=150, default="")
    def __str__(self):
        return self.name

class Location(models.Model):
    locationID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name



class Quest(models.Model):
    questID = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UserProfile, on_delete=models.PROTECT)
    questTypeID = models.ForeignKey(QuestType, on_delete=models.CASCADE)
    locationID = models.ForeignKey(Location, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True, unique=False)
    task = models.CharField(max_length=150, default=0)
    reward = models.PositiveBigIntegerField(default=0, unique=False)
    state = models.BooleanField(default=False, unique=False)
    imgURL = models.CharField(max_length=150, default="")
    
    def __str__(self):
        return self.name
    
class Image(models.Model):
    imageID = models.BigAutoField(primary_key=True)
    image = models.ImageField(upload_to='images/')
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    
    def __str__(self):
        return self.name

class Society(models.Model):
    societyID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150, default="")
    numberOfMembers = models.PositiveBigIntegerField(default=0, unique=False)
    societyXP = models.PositiveBigIntegerField(default=0, unique=False)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Societies"

class Membership(models.Model):
    membershipID = models.BigAutoField(primary_key=True)
    societyID = models.ForeignKey(Society, on_delete=models.PROTECT)
    name = name = models.CharField(max_length=80)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    since = models.DateField(auto_now_add=True, unique=False)
    state = models.BooleanField(default=False, unique=False)
    
    def __str__(self):
        return self.name