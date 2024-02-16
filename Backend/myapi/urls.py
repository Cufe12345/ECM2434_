from django.urls import path
from . import views
from .views import TestAPIView

urlpatterns = [
    path('test_api/', TestAPIView.as_view(), name='test_api'),
]