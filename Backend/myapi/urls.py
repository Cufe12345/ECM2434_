from django.urls import path
from . import views
from django.conf.urls import include
from django.conf import settings
from .views import TestAPIView

urlpatterns = [
    path('test_api/', TestAPIView.as_view(), name='test_api'),
    path('quest/',views.getQuest, name='Quest'),
    path('account/',include('djoser.urls')),
    path('account/',include('djoser.urls.authtoken')),
]