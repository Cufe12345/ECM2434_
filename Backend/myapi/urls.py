from django.urls import path
from . import views
from django.conf.urls import include
from django.conf import settings
from .views import TestAPIView, CurrentUserProfileView, TopNUsersView, Top10UsersView

#Test account:
#email: test@gmail.com
#username: test
#password: test12345

urlpatterns = [
    #test
    path('test_api/', TestAPIView.as_view(), name='test_api'),
    #account/users/ and account/users/me/ for short user info
    path('account/',include('djoser.urls')),
    #account/token/login/ and account/token/logout/ for token control
    path('account/',include('djoser.urls.authtoken')),
    # -- you have to be logged in for all below endpoints --
    # get all users in full profile
    path('users/',views.getUser, name='Users profiles'),
    # get this user in full profile
    path('user/',CurrentUserProfileView.as_view(), name='Users profiles'),
    # add a new user full profile - this should be done in backend when user registers not called by frontend
    path('user/add/',views.addUser, name='Add full user'),
    # get top 10 best users for leaderboard
    path('leaderboard_10/', Top10UsersView.as_view(), name='Leaderboard Top 10'),
    # get top n best users for leaderboard
    path('leaderboard_n/', TopNUsersView.as_view(), name='Leaderboard Top N'),
    # see all quests
    path('quest/',views.getQuest, name='Quest'),
    # add a quest
    path('quest/add/',views.addQuest, name='Add quest'),
    # see al societies
    path('society/',views.getSociety, name='Society'),
    # add a society
    path('society/add/',views.addSociety, name='Add Society'),
    # see all memberships to a society 
    path('society/membership/',views.getMembership, name='Memberships'),
    # add amembership to a society
    path('society/membership/add',views.addMembership, name='Add Memberships'),
]
