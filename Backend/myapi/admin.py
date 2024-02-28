"""
Authors: @Stickman230 - Maxime Reynaud, @Utzo-Main - IBENYE, Uzodinma, @charlesmentuni - Charles Ment 
Email: mpcr201@exeter.ac.uk, ui204@exeter.ac.uk, cm1099@exeter.ac.uk

This file defines how the admin portal is build, and adds fields realated to our models
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import UserProfile
from .models import UserProfile ,Quest, Society,  Membership, QuestType, Friend, Location, Image

'''
The admin.py file in a Django application is used to register your models with Django's built-in admin interface. 
Django's admin interface is a powerful and auto-generated tool that allows for easy database management.

- Import Models:

- Register Models: After importing the models, you use the admin.site.register() function to register each model with the admin site

- Customization: Django also allows for extensive customization of how models are presented in the admin interface. 
'''

# --- ALL ADMIN REGISTRATIONS WHERE MADE BY @Utzo-Main, @Stickman230 and @charlesmentuni ---
class UserProfileAdmin(UserAdmin):
    model = UserProfile
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('birthday', 'bio', 'rank', 'XP')}),
    )
    # This will add a filter horizontal widget to select groups easily
    filter_horizontal = ('groups',)

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Quest)
admin.site.register(Friend)
admin.site.register(QuestType)
admin.site.register(Society)
admin.site.register(Membership)
admin.site.register(Location)
admin.site.register(Image)


