from rest_framework import serializers
from .models import Quest, Society


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
        model = Society
        fields = ('membershipID','societyID','since','state')
        
class MembershipAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ('user','societyID','state')

 