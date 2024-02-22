from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile", primary_key=True)
    birthday = models.DateField(null=True, unique=False)
    bio = models.CharField(max_length=150, default="")
    rank = models.PositiveIntegerField(default=1, unique=False)
    
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    profile, created = UserProfile.objects.get_or_create(user=instance)
    profile.save()
    
class Leaderboard(models.Model):
    leaderboardID = models.BigAutoField(primary_key=True)
    leaderboardName = models.CharField(max_length=50)
    leaderboardDescription = models.CharField(max_length=150)
    startDate = models.DateField(auto_now_add=True)
    endDate = models.DateField()

class UserLeaderboard(models.Model):
    userLeaderboardID = models.BigAutoField(primary_key=True)
    #user = models.ForeignKey(User, on_delete=models.PROTECT)
    leaderboardID = models.ForeignKey(Leaderboard, on_delete=models.PROTECT)
    score = models.IntegerField()

class RewardLeaderboard(models.Model):
    rewardLeaderboardID = models.BigAutoField(primary_key=True)
    leaderboardID = models.ForeignKey(Leaderboard, on_delete=models.PROTECT)
    rankingCondition = models.IntegerField()
    currency = models.IntegerField()


class QuestType(models.Model):
    questTypeID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=150, default="")
    
    def __str__(self):
        return self.name

class Quest(models.Model):
    questID = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    #questTypeID = models.ForeignKey(QuestType, on_delete=models.PROTECT)
    name = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True, unique=False)
    task = models.CharField(max_length=150, default=0)
    reward = models.PositiveBigIntegerField(default=0, unique=False)
    state = models.BooleanField(default=False, unique=False)
    
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    since = models.DateField(auto_now_add=True, unique=False)
    state = models.BooleanField(default=False, unique=False)
    
    def __str__(self):
        return self.name
    
    