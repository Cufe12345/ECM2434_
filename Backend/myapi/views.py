from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Quest, Society, Membership
from .serializer import QuestAddSerializer,QuestGetSerializer, SocietyAddSerializer,SocietyGetSerializer, MembershipAddSerializer,  MembershipGetSerializer


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
'''
@api_view(['GET'])
def getUser(request):
    app = userProfile.objects.all()
    serializer = UserSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
'''


class TestAPIView(APIView):
    """
    A simple APIView that returns a message.
    """
    def get(self, request):
        # Define the data that you want to send back
        data = {'message': 'Hello from Django!'}
        # Return the data with a status code
        return Response(data, status=status.HTTP_200_OK)