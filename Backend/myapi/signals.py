'''
Authors: @Stickman230 - Maxime Reynaud
Email: mpcr201@exeter.ac.uk

This file defines how we add any created user to the player group by default
'''
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from .models import UserProfile

@receiver(post_save, sender=UserProfile)
def add_user_to_player_group(sender, instance, created, **kwargs):
    if created and not instance.groups.filter(name=instance.PLAYER).exists():
        # Get or create the Player group
        player_group, _ = Group.objects.get_or_create(name=instance.PLAYER)
        # Add the new user to the Player group
        player_group.user_set.add(instance)

post_save.connect(add_user_to_player_group, sender=UserProfile)