from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics, permissions
from .models import Quest, Society, Membership, UserProfile, QuestType, Location, Friend
from .serializer import UserProfileGetSerializer,UserProfileAddSerializer, QuestTypeGetSerializer,QuestTypeAddSerializer,QuestGetSerializer,QuestAddSerializer,LocationGetSerializer,LocationAddSerializer,SocietyAddSerializer,SocietyGetSerializer, MembershipAddSerializer,  MembershipGetSerializer, FriendSerializer
from django.db.models import Q

class TestAPIView(APIView):
    """
    A simple APIView that returns a message.
    """
    def get(self, request):
        # Define the data that you want to send back
        data = {'message': 'Hello from Django!'}
        # Return the data with a status code
        return Response(data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def getUser(request):
    app = UserProfile.objects.all()
    serializer = UserProfileGetSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def addUser(request):
    serializer = UserProfileAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def getQuestType(request):
    app = QuestType.objects.all()
    serializer = QuestTypeGetSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addQuestType(request):
    serializer = QuestTypeAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
def getQuest(request):
    app = Quest.objects.all()
    serializer = QuestGetSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addQuest(request):
    serializer = QuestAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
def getLocation(request):
    app = Location.objects.all()
    serializer = LocationGetSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addLocation(request):
    serializer = LocationAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
def getSociety(request):
    app = Society.objects.all()
    serializer = SocietyGetSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addSociety(request):
    serializer = SocietyAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
def getMembership(request):
    app = Membership.objects.all()
    serializer = MembershipGetSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addMembership(request):
    serializer = MembershipAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# get logged user full profile
class CurrentUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
# get 10 best users 
class Top10UsersView(APIView):
    
    def get(self, request, format=None):
        top_users = UserProfile.objects.order_by('-rank', '-XP')[:10]
        serializer = UserProfileGetSerializer(top_users, many=True)
        return Response(serializer.data)
    
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
        #top_users = UserProfile.objects.filter(username=).order_by('-rank', '-XP')[:10]
        serializer = UserProfileGetSerializer(top_friends, many=True)
        return Response(serializer.data)

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
