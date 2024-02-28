"""
Authors: @Stickman230 - Maxime Reynaud, @Utzo-Main - IBENYE, Uzodinma, @charlesmentuni - Charles Ment 
Email: mpcr201@exeter.ac.uk, ui204@exeter.ac.uk, cm1099@exeter.ac.uk

This file defines how we create views using our serializers
"""
from django.shortcuts import render, get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Group
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics, permissions
from .models import Quest, Society, Membership, UserProfile, QuestType, Location, Friend, Image
from .serializer import UserProfileGetSerializer,UserProfileAddSerializer,UserRoleSerializer, ImageUploadSerializer,QuestTypeGetSerializer,QuestTypeAddSerializer,QuestGetSerializer,QuestAddSerializer,LocationGetSerializer,LocationAddSerializer,SocietyAddSerializer,SocietyGetSerializer, MembershipAddSerializer,  MembershipGetSerializer, FriendSerializer, ImageGetSerializer, AllImageGetSerializer
from .permissions import CanSetRole


# Author: @Stickman230
# Fetches and returns all UserProfile instances.    
@api_view(['GET'])
def getUser(request):
    app = UserProfile.objects.all()
    serializer = UserProfileGetSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Stickman230
# Creates a new UserProfile instance from the request data.
@api_view(['POST'])
@permission_classes([AllowAny])
def addUser(request):
    serializer = UserProfileAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Author: @Stickman230
# get user role coresponding to username
@api_view(['GET'])
def getUserRole(request):
    app = UserProfile.objects.all()
    serializer = UserRoleSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Stickman230
# add a user as gamekeeper
class SetGameKeeperView(APIView):
    permission_classes = [permissions.IsAuthenticated,CanSetRole]
    def post(self, request, username):
        user_profile = get_object_or_404(UserProfile, username=username)

        # Check if the request is to set the user as GameKeeper
        user_profile.groups.clear()
        user_profile.role = UserProfile.GAME_KEEPER
        user_profile.is_staff = True
        user_profile.save()
        
        # Add user to the gamekeeper_profile group
        gamekeeper_group, _ = Group.objects.get_or_create(name='GameKeeper')
        gamekeeper_group.user_set.add(user_profile)
        return Response({'status': 'User role updated to GameKeeper'}, status=status.HTTP_200_OK)

# Author: @Stickman230
# add a user as developer 
class SetDeveloperView(APIView):
    permission_classes = [permissions.IsAuthenticated,CanSetRole]
    def post(self, request, username):
        user_profile = get_object_or_404(UserProfile, username=username)

        # Check if the request is to set the user as GameKeeper
        user_profile.groups.clear()
        user_profile.role = UserProfile.DEVELOPER
        user_profile.is_staff = True
        user_profile.save()
        
        # Add user to the gamekeeper_profile group
        developer_group, _ = Group.objects.get_or_create(name='Developer')
        developer_group.user_set.add(user_profile)
        return Response({'status': 'User role updated to Developer'}, status=status.HTTP_200_OK)

# Author: @Stickman230
# add a user as player
class SetPlayerView(APIView):
    permission_classes = [permissions.IsAuthenticated,CanSetRole]
    def post(self, request, username):
        user_profile = get_object_or_404(UserProfile, username=username)

        # Check if the request is to set the user as GameKeeper
        user_profile.groups.clear()
        user_profile.role = UserProfile.PLAYER
        user_profile.is_staff = False
        user_profile.save()
        
        # Add user to the gamekeeper_profile group
        developer_group, _ = Group.objects.get_or_create(name='Player')
        developer_group.user_set.add(user_profile)
        return Response({'status': 'User role updated to Player'}, status=status.HTTP_200_OK)
        
# Author: @Utzo-Main
# Fetches and returns all QuestType instances.
@api_view(['GET'])
def getQuestType(request):
    app = QuestType.objects.all()
    serializer = QuestTypeGetSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Utzo-Main
# Creates a new QuestType instance from the request data.
@api_view(['POST'])
def addQuestType(request):
    serializer = QuestTypeAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# Author: @Stickman230
# Fetches and returns all Quest instances.
@api_view(['GET'])
def getQuest(request):
    app = Quest.objects.all()
    serializer = QuestGetSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Stickman230
# Creates a new Quest instance from the request data.
@api_view(['POST'])
def addQuest(request):
    serializer = QuestAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# Author: @Stickman230
# Fetches and returns all Location instances.
@api_view(['GET'])
def getLocation(request):
    app = Location.objects.all()
    serializer = LocationGetSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Stickman230
# Creates a new Location instance from the request data.
@api_view(['POST'])
def addLocation(request):
    serializer = LocationAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# Author: @Stickman230
# Fetches and returns all Society instances.
@api_view(['GET'])
def getSociety(request):
    app = Society.objects.all()
    serializer = SocietyGetSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Stickman230
# Creates a new Society instance from the request data.
@api_view(['POST'])
def addSociety(request):
    serializer = SocietyAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# Author: @Stickman230
# Fetches and returns all Membership instances.
@api_view(['GET'])
def getMembership(request):
    app = Membership.objects.all()
    serializer = MembershipGetSerializer(app, many=True)
    return Response(serializer.data)

# Author: @Stickman230
# Creates a new Membership instance from the request data.
@api_view(['POST'])
def addMembership(request):
    serializer = MembershipAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# Authors: @Utzo-Main, @Stickman230   
# Fetches and returns all Image instances.
@api_view(['GET'])
def getAllImages(request):
    app = Image.objects.all()
    serializer = AllImageGetSerializer(app, many=True)
    return Response(serializer.data)

# Authors: @Utzo-Main, @Stickman230   
# Fetches and returns a specific Image instance by primary key (pk).
class ImageView(APIView):
    def get(self, request, pk, format=None):
        try:
            image = Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Pass the request to the serializer context
        serializer = ImageGetSerializer(image, context={'request': request})
        return Response(serializer.data)
    
# Authors: @charlesmentuni, @Stickman230
# Fetches and returns all Friend instances.
@api_view(['GET'])
def getAllFriends(request):
    app = Friend.objects.all()
    serializer = FriendSerializer(app, many=True)
    return Response(serializer.data)

# Authors: @charlesmentuni, @Stickman230
# Creates a new Friend instance from the request data.
@api_view(['POST'])
def addFriend(request):
    serializer = FriendSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# Author: @Stickman230
# get logged user full profile
class CurrentUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# Author: @Stickman230
# get a user profile by searching his username
class GetUserByUsernameView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        if not username:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserProfile.objects.get(username=username)
            serializer = UserProfileAddSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

# Author: @Stickman230
# get 10 best users 
class Top10UsersView(APIView):
    def get(self, request, format=None):
        top_users = UserProfile.objects.order_by('-rank', '-XP')[:10]
        serializer = UserProfileGetSerializer(top_users, many=True)
        return Response(serializer.data)

# Author: @Stickman230    
# get n best users     
class TopNUsersView(APIView):   
    def post(self, request, *args, **kwargs):
        # Get the number 'n' from POST data
        n = request.data.get('n')
        # Validate 'n' is an integer and greater than 0
        try:
            n = int(n)
            if n <= 0:
                raise ValueError("Number of users must be greater than 0.")
        except (TypeError, ValueError):
            return Response({"error": "Invalid number provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Query for the top 'n' users
        top_users = UserProfile.objects.order_by('-rank', '-XP')[:n]
        serializer = UserProfileGetSerializer(top_users, many=True)
        
        return Response(serializer.data)
    
# Author: @charlesmentuni
# get 10 best friend users
class Top10FriendsView(APIView):
    def get(self, request, format=None):
        all_friendships = Friend.objects.filter(Q(user1=request.user) | Q(user2=request.user))
        # Remove all username so you only have a list of friends
        all_friends = []
        all_friends.append(request.user.id)
        for friendship in all_friendships:
            if friendship.user1 == request.user:
                all_friends.append(friendship.user2.id)
            else:
                all_friends.append(friendship.user1.id)
        top_friends = UserProfile.objects.filter(id__in=all_friends).order_by('-rank', '-XP')[:10]
        serializer = UserProfileGetSerializer(top_friends, many=True)
        return Response(serializer.data)

# Author: @charlesmentuni   
# get the friends of a user
class FriendView(APIView):
    def get(self, request, format=None):
        all_friendships = Friend.objects.filter(Q(user1=request.user) | Q(user2=request.user))
        # Remove all username so you only have a list of friends
        all_friends = []
        for friendship in all_friendships:
            if friendship.user1 == request.user:
                all_friends.append(friendship.user2.id)
            else:
                all_friends.append(friendship.user1.id)
        friends = UserProfile.objects.filter(id__in=all_friends)
        serializer = UserProfileGetSerializer(friends, many=True)
        return Response(serializer.data)

# Author: @charlesmentuni   
# get n best friend users
class TopNFriendsView(APIView):
    def post(self, request, *args, **kwargs):
        # Get the number 'n' from POST data
        n = request.data.get('n')

        # Validate 'n' is an integer and greater than 0
        try:
            n = int(n)
            if n <= 0:
                raise ValueError("Number of users must be greater than 0.")
        except (TypeError, ValueError):
            return Response({"error": "Invalid number provided."}, status=status.HTTP_400_BAD_REQUEST)
        all_friendships = Friend.objects.filter(Q(user1=request.user) | Q(user2=request.user))
        # Remove all username so you only have a list of friends
        all_friends = []
        for friendship in all_friendships:
            if friendship.user1 == request.user:
                all_friends.append(friendship.user2.id)
            else:
                all_friends.append(friendship.user1.id)
        friends = UserProfile.objects.filter(id__in=all_friends)
        serializer = UserProfileGetSerializer(friends, many=True)
        return Response(serializer.data)

# Authors: @Utzo-Main, @Stickman230
# View to upload an image 
class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
