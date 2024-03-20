"""
Author: @Stickman230 - Maxime Reynaud, @Utzo-Main - IBENYE, Uzodinma, @charlesmentuni - Charles Ment 
Email: mpcr201@exeter.ac.uk, ui204@exeter.ac.uk, cm1099@exeter.ac.uk

This file defines how we acces the API endpoints via urls
"""
from django.urls import path
from . import views
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static
from .views import CurrentUserProfileView, GetUserByUsernameView,ImageView, GetVerifiedSubFromQuestID,TopNUsersView, Top10UsersView, Top10FriendsView,ImageUploadView, FriendView, TopNFriendsView,VerifiedQuestSubListView,QuestSubListView,NonVerifiedQuestSubListView ,SetDeveloperView,SetGameKeeperView, SetPlayerView, EmailVerification

urlpatterns = [
    #account/users/ and account/users/me/ for short user info
    path('account/',include('djoser.urls')),
    #account/token/login/ and account/token/logout/ for token control
    path('account/',include('djoser.urls.authtoken')),
    # add a new user full profile - this should be done in backend when user registers not called by frontend
    path('account/users/',views.addUser, name='Add full user'),
    # send activation email
    path('activate/', EmailVerification.as_view(), name='Send activation email'),
    path('activate/<username1>/<token>/', EmailVerification.as_view(), name='Activate email'),

    # path('forgot_password/', ForgotPassword.as_view(), name='Send forgot password email'),
    # path('forgot_password/<username1>/<token>/', ForgotPassword.as_view(), name='New password'),
    
    # -- you have to be logged in for all below endpoints --
    # get all users in full profile
    path('users/',views.getUser, name='Users profiles'),
    # get this user in full profile
    path('user/',CurrentUserProfileView.as_view(), name='User profile'),
    # modify this user profile
    path('user/modify',views.modifyUser, name='User modify'),
    # get user by username  
    path('users/getByUsername/',GetUserByUsernameView.as_view(), name='Get user by username'),
    # set user as gamekeeper
    path('users/set-gamekeeper/<str:username>/', SetGameKeeperView.as_view(), name='set-gamekeeper'),
    # set user as gamekeeper
    path('users/set-developer/<str:username>/', SetDeveloperView.as_view(), name='set-developer'),
    # set user as gamekeeper
    path('users/set-player/<str:username>/', SetPlayerView.as_view(), name='set-player'),
    # get top 10 best users for leaderboard
    path('leaderboard_10/', Top10UsersView.as_view(), name='Leaderboard Top 10'),
    # get top n best users for leaderboard
    path('leaderboard_n/', TopNUsersView.as_view(), name='Leaderboard Top N'),
    # get logged user friend list
    path('friends/',FriendView.as_view(), name='Friends'),
    # add friend
    path('friends/add/',views.addFriend, name='Add Friends'),
    # get all friends
    path('friends/all/',views.getAllFriends, name='see all Friends'),
    # get top 10 friend leaderboard
    path('friends/leaderboard_10/', Top10FriendsView.as_view(), name='Friends Leaderboard'),
    # get top n friend leaderboard
    path('friends/leaderboard_n/', TopNFriendsView.as_view(), name='Friends Leaderboard N'),
    # see all quests
    path('quest/',views.getQuest, name='Quest'),
    # add a quest
    path('quest/add/',views.addQuest, name='Add quest'),
    # see all questTypes
    path('quest/type/',views.getQuestType, name='QuestType'),
    # add a questType
    path('quest/type/add',views.addQuestType, name='Add a quest type'),
    # see location
    path('quest/location/',views.getLocation, name='get all locations'),
    # add a location
    path('quest/location/add',views.addLocation, name='add a location'),
    # get all submissions for quests
    path('quest/submissions/',QuestSubListView.as_view(), name='get all submissions'),
    # add a submission to a quest 
    path('quest/submissions/add/',views.addQuestSub, name='add a submissions'),
    # get all valid submissions for quests
    path('quest/submissions/valid',VerifiedQuestSubListView.as_view(), name='get all valid submissions'),
    # get all valid quest from a quest ID
    path('quest/submissions/valid/ByQuestID',GetVerifiedSubFromQuestID.as_view(), name='get all valid submissions'),
    # get all non valid submission to a quest 
    path('quest/submissions/non-valid',NonVerifiedQuestSubListView.as_view(), name='get all non-valid submissions'),
    # validates quest submission if they're a game keeper
    path('quest/submissions/validate/',views.validate_quest_submission, name='Validate quest submission'),
    # rejects quest submission if they're a game keeper
    path('quest/submissions/reject/',views.reject_quest_submission, name='Reject quest submission'),
    # Delete quest submission if they're a game keeper
    path('quest/submissions/delete/',views.delete_quest_submission, name='Delete quest submission'),
    # see all societies
    path('society/',views.getSociety, name='Society'),
    # add a society
    path('society/add/',views.addSociety, name='Add Society'),
    # see all memberships to a society 
    path('society/membership/',views.getMembership, name='Memberships'),
    # add amembership to a society
    path('society/membership/add',views.addMembership, name='Add Memberships'),
    # Upload an image
    path('media/images/upload',ImageUploadView.as_view(), name='add a image'),
    #get images
    path('media/images/',views.getAllImages, name='Get All images'),
    #get full url of images
    path('media/images/<int:pk>/', ImageView.as_view(), name='image-url'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
