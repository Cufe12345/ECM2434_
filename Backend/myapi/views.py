from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TestAPIView(APIView):
    """
    A simple APIView that returns a message.
    """
    def get(self, request):
        # Define the data that you want to send back
        data = {'message': 'Hello from Django!'}
        # Return the data with a status code
        return Response(data, status=status.HTTP_200_OK)