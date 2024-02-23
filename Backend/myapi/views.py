from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics, permissions
from .models import Quest, Society, Membership, UserProfile
from .serializer import UserProfileGetSerializer,UserProfileAddSerializer,QuestGetSerializer,QuestAddSerializer, SocietyAddSerializer,SocietyGetSerializer, MembershipAddSerializer,  MembershipGetSerializer

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
def addUser(request):
    serializer = UserProfileAddSerializer(data=request.data)
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
        return self.request.user.profile
    
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
