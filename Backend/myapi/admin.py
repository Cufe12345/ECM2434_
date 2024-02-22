from django.contrib import admin
from .models import Quest, User

admin.site.register(Quest)
admin.site.register(User)

# Register your models here.
'''
The admin.py file in a Django application is used to register your models with Django's built-in admin interface. 
Django's admin interface is a powerful and auto-generated tool that allows for easy database management.

- Import Models:

- Register Models: After importing the models, you use the admin.site.register() function to register each model with the admin site

- Customization: Django also allows for extensive customization of how models are presented in the admin interface. 
'''