from django.contrib import admin
from .models import Quest, Society, UserProfile, Membership, QuestType, Friend
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

admin.site.register(Quest)
admin.site.register(Society)
admin.site.register(Membership)
admin.site.register(Friend)

class ProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'User Profiles'

class CustumizedUserAdmin(UserAdmin):
    inlines = (ProfileInline, )
    
admin.site.unregister(User)
admin.site.register(User, CustumizedUserAdmin)
admin.site.register(UserProfile)
admin.site.register(QuestType)

'''
The admin.py file in a Django application is used to register your models with Django's built-in admin interface. 
Django's admin interface is a powerful and auto-generated tool that allows for easy database management.

- Import Models:

- Register Models: After importing the models, you use the admin.site.register() function to register each model with the admin site

- Customization: Django also allows for extensive customization of how models are presented in the admin interface. 
'''
