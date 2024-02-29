from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics, permissions
from .models import Quest, Society, Membership, UserProfile, QuestType, Location, Friend, Image
from .serializer import UserProfileGetSerializer,UserProfileAddSerializer, QuestTypeGetSerializer,QuestTypeAddSerializer,QuestGetSerializer,QuestAddSerializer,LocationGetSerializer,LocationAddSerializer,SocietyAddSerializer,SocietyGetSerializer, MembershipAddSerializer,  MembershipGetSerializer, FriendSerializer, ImageGetSerializer, AllImageGetSerializer
from django.db.models import Q
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
import pdb    


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
    print("give me a user")
    serializer = UserProfileAddSerializer(data=request.data)
    if serializer.is_valid():
        #token = default_token_generator.make_token(serializer.data)
        success = send_mail(
        'Activate your account',
        'Click the link to activate your account: http://localhost:8000/activate/', recipient_list=["loughkevin55@gmail.com"], from_email=None, fail_silently=False)
        serializer.save()
        
        
        #{uid}/{token}'.format(uid=user.id, token=user.token)
        # send_mail(
        #     'Activate your account',
        #     'Click the link to activate your account: http://localhost:8000/activate/{uid}/{token}'.format(uid=serializer.data['id'], token=token), recipient_list=[serializer.data['email']], from_email=None, fail_silently=False)
        # send_mail(
        # 'Activate your account',
        # 'Click the link to activate your account: http://localhost:8000/activate/', recipient_list=["loughkevin55@gmail.com"], from_email=None, fail_silently=False)
        #{uid}/{token}'.format(uid=user.id, token=user.token)
        return Response(success, status=status.HTTP_200_OK)
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

@api_view(['GET'])
def getAllImages(request):
    app = Image.objects.all()
    serializer = AllImageGetSerializer(app, many=True)
    return Response(serializer.data)



class EmailVerification(APIView):
    def get(self, request, username1, token, *args, **kwargs):
        # Gets the user from the username passed through the url
        user = UserProfile.objects.get(username=username1)
        # Checks if the token is valid
        tokenValid = default_token_generator.check_token(user, token)
        if tokenValid:
            # Sets the user in the database as active
            user.is_active = True
            user.save()
            return Response({"message": "User activated."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, *args, **kwargs):
        # Gets the user from the username passed through the header
        userActivated = UserProfile.objects.get(username=request.data['username'])
        # Generates a token associated with the user
        token = default_token_generator.make_token(userActivated)
        # Sends token to their email, so they can verify that they own their email
        success = send_mail(
            'Activate your account',
            f'Click the link to activate your account: http://localhost:8000/api/activate/{request.data["username"]}/{token}', recipient_list=[request.data["email"]], from_email=None, fail_silently=False)
        return Response({"message": f"Activation email sent.{success}"}, status=status.HTTP_200_OK)
        
# class ForgotPassword(APIView):
#     def get(self, request, *args, **kwargs):
#         user = UserProfile.objects.get(username=request.data['username'])
#         token = default_token_generator.make_token(user)
#         success = send_mail(
#             'Reset your password',
#             f'Click the link to reset your password: http://localhost:8000/api/reset_password/{request.data["username"]}/{token}', recipient_list=[request.data["email"]], from_email=None, fail_silently=False)
#         return Response({"message": f"Password reset email sent.{success}"}, status=status.HTTP_200_OK)
#     def post(self, request, username1, token, *args, **kwargs):
#         user = UserProfile.objects.get(username=username1)
#         tokenValid = default_token_generator.check_token(user, token)
#         if tokenValid:
#             user.set_password(request.data['password'])
#             user.save()
#             return Response({"message": "Password reset."}, status=status.HTTP_200_OK)


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
    
# class EmailVerification(APIView):
#     def get(self, request, *args, **kwargs):
#         # Get the user from the token
#         user = UserProfile.objects.get(id=kwargs['uid'])
#         # Check if the token is valid
#         if user.token == kwargs['token']:
#             # Set the user as active
#             user.is_active = True
#             user.save()
#             return Response({"message": "User activated."}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    
