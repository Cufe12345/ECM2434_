from rest_framework import serializers
#from django.contrib.auth.models import User
from .models import Quest, QuestType, Society, Membership, UserProfile,Location, Friend
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer

class UserProfileAddSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = UserProfile
        fields = ['id','username','first_name','last_name','email','bio','password']

class UserProfileGetSerializer(BaseUserCreateSerializer):
    class Meta:
        model = UserProfile
        fields = ['id','username','first_name','last_name','email','birthday','bio','rank','XP']

class QuestTypeGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestType
        fields = ('questTypeID','name','description')

class QuestTypeAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestType
        fields = ('name','description')

class QuestGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('questID','user','questTypeID','name','date_created','task','locationID','state','reward')

class QuestAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('user','questTypeID','locationID','name','task','reward','state')

class LocationGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('locationID','name','latitude','longitude')

class LocationAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('name','latitude','longitude')
       
class SocietyGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        verbose_name_plural = "Societies"
        fields = ('societyID','name','description','numberOfMembers','societyXP')
        
class SocietyAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        verbose_name_plural = "Societies"
        fields = ('name','description')

class MembershipGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('membershipID','societyID','since','state')
        
class MembershipAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('user','societyID','state')

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('user1','user2')
