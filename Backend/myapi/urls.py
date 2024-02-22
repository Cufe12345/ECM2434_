from django.urls import path
from . import views
from django.conf.urls import include
from django.conf import settings
from .views import TestAPIView

urlpatterns = [
    path('test_api/', TestAPIView.as_view(), name='test_api'),
    path('account/',include('djoser.urls')),
    path('account/',include('djoser.urls.authtoken')),
    path('users/',views.getUser, name='Users profiles'),
    path('users/add/',views.addUser, name='Add full user'),
    path('quest/',views.getQuest, name='Quest'),
    path('quest/add/',views.addQuest, name='Add quest'),
    path('society/',views.getSociety, name='Society'),
    path('society/add/',views.addSociety, name='Add Society'),
    path('society/membership/',views.getMembership, name='Memberships'),
    path('society/membership/add',views.addMembership, name='Add Memberships'),
]
