from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Quest
from .serializer import QuestSerializer


@api_view(['GET'])
def getQuest(request):
    app = Quest.objects.all()
    serializer = QuestSerializer(app, many=True)
    return Response(serializer.data)

class TestAPIView(APIView):
    """
    A simple APIView that returns a message.
    """
    def get(self, request):
        # Define the data that you want to send back
        data = {'message': 'Hello from Django!'}
        # Return the data with a status code
        return Response(data, status=status.HTTP_200_OK)