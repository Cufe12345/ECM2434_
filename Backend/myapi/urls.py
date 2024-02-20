from django.urls import path
from . import views
from django.conf.urls import include
from .views import TestAPIView

urlpatterns = [
    path('test_api/', TestAPIView.as_view(), name='test_api'),
    path('v1/',include('djoser.urls')),
    path('v1/',include('djoser.urls.authtoken')),
]