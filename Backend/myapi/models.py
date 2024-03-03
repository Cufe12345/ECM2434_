"""
Authors: @Stickman230 - Maxime Reynaud, @Utzo-Main - IBENYE, Uzodinma, @charlesmentuni - Charles Ment 
Email: mpcr201@exeter.ac.uk, ui204@exeter.ac.uk, cm1099@exeter.ac.uk

This file defines how we build our models and extend the user class
Models include : Quest, QuestType, Society, Membership, UserProfile,Location, Friend, Image
"""
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser

# --- ALL MODELS WHERE BUILD AND MAINTINED BY @Utzo-Main, @charlesmentuni and @Stickman230 ---

# Extends the default user model with additional fields and role choices.
class UserProfile(AbstractUser):
    email = models.EmailField(unique=True)  # Unique email for each user.
    # Constant values for user roles.
    PLAYER = 'Player'
    GAME_KEEPER = 'GameKeeper'
    DEVELOPER = 'Developer'
    # Role choices available for the user.
    ROLE_CHOICES = [
        (PLAYER, 'Player'),
        (GAME_KEEPER, 'GameKeeper'),
        (DEVELOPER, 'Developer'),
    ]
    # Field to store the user's role with default set to 'Player'.
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=PLAYER)
    birthday = models.DateField(null=True, blank=True)  # Optional birthday field.
    bio = models.CharField(max_length=150, default="")  # Short bio for the user.
    rank = models.PositiveIntegerField(default=1)  # Rank field with default value.
    XP = models.PositiveIntegerField(default=0)  # Experience points field with default value.
    streak = models.PositiveIntegerField(default=0)  # Streak field with default value.
    #is_active = models.BooleanField(default=False)  # Flag to indicate if the user is active.

# Defines the Friend relationship model.
class Friend(models.Model):
    # Establishes a foreign key relationship to the UserProfile for two users.
    user1 = models.ForeignKey(UserProfile, related_name='friends_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(UserProfile, related_name='friends_user2', on_delete=models.CASCADE)
    
    # String representation of the Friend model.
    def __str__(self):
        return f"{self.user1.id} |  {self.user2.id}"
    
    # Custom clean method to validate that users are not friends with themselves.
    def clean(self):
        if self.user1 == self.user2:
            raise ValidationError("user1 and user2 cannot be the same.")
        
    # Overrides the save method to include clean method validation before saving.
    def save(self, *args, **kwargs): 
        self.clean()
        super(Friend, self).save(*args, **kwargs)

# Defines the QuestType model with a name and description.
class QuestType(models.Model):
    questTypeID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=80, unique=True)
    description = models.CharField(max_length=150, default="")
    
    def __str__(self):
        return self.name

# Defines the Location model with geographic coordinates.
class Location(models.Model):
    locationID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name

# Defines the Image model to store images with a name and description.
class Image(models.Model):
    imageID = models.BigAutoField(primary_key=True)
    image = models.ImageField(upload_to='images/')
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    
    def __str__(self):
        return self.name

# Defines the Quest model with details about each quest.
class Quest(models.Model):
    questID = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UserProfile, on_delete=models.PROTECT)
    questTypeID = models.ForeignKey(QuestType, on_delete=models.CASCADE)
    locationID = models.ForeignKey(Location, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)
    task = models.CharField(max_length=150, default="")
    reward = models.PositiveBigIntegerField(default=0)
    state = models.BooleanField(default=False)
    imgURL = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

# Defines the QuestSubmission model to store user submissions for quests.
class QuestSubmission(models.Model):
    questsubID = models.BigAutoField(primary_key=True)
    questID = models.ForeignKey(Quest, on_delete=models.CASCADE)
    #user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    imgURL = models.CharField(max_length=200)
    info = models.CharField(max_length=150, default="The task has been completed")
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Quest submission for quest {self.questID.questID}"

# Defines the Society model with details about each society.
class Society(models.Model):
    societyID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150, default="")
    numberOfMembers = models.PositiveBigIntegerField(default=0)
    societyXP = models.PositiveBigIntegerField(default=0)

    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Societies"

# defines the Membership model and fields,
# foreign keys are user, societyID to reference user and society
class Membership(models.Model):
    membershipID = models.BigAutoField(primary_key=True)
    societyID = models.ForeignKey(Society, on_delete=models.PROTECT)
    name = name = models.CharField(max_length=80)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    since = models.DateField(auto_now_add=True, unique=False)
    state = models.BooleanField(default=False, unique=False)
    
    def __str__(self):
        return self.name