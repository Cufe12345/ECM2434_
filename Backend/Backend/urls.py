"""
Author: @Stickman230 - Maxime Reynaud
Email: mpcr201@exeter.ac.uk

This file defines the patern for the admin and API endpoint 
"""

from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapi.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)