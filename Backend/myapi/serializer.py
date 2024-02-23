from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Quest, QuestType, Society, Membership, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
        
class UserProfileGetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    class Meta:
        model = UserProfile
        fields = ('user','birthday','bio','rank','XP')

class UserProfileAddSerializer(serializers.ModelSerializer):
    user = UserSerializer
    class Meta:
        model = UserProfile
        fields = ('user','birthday','bio','rank','XP')

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
        fields = ('questID','name','questTypeID','date_created','task','state','reward')

class QuestAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('name','task','reward')
       
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
