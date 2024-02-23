from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Quest, Society, Membership, UserProfile

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
        
class UserProfileAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user','birthday','bio','rank','XP')
        
class QuestAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('name','task','state')
        
class QuestGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('questID','name','date_created','task','state','reward')
       
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

 