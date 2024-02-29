"""
Authors: @Stickman230 - Maxime Reynaud, @Utzo-Main - IBENYE, Uzodinma, @charlesmentuni - Charles Ment 
Email: mpcr201@exeter.ac.uk, ui204@exeter.ac.uk, cm1099@exeter.ac.uk

This file defines how we serialize our models and what we retrun from them depending on the type of request.
"""

from rest_framework import serializers
from .models import Quest, QuestType, Society, Membership, UserProfile,Location, Friend, Image
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer

# Author: @Stickman230
# Serializer for adding a new user profile
class UserProfileAddSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = UserProfile
        fields = ['id','username','first_name','last_name','email','bio','password']

# Author: @Stickman230
# Serializer for retrieving user profile information
class UserProfileGetSerializer(BaseUserCreateSerializer):
    class Meta:
        model = UserProfile
        fields = ['id','username','first_name','last_name','email','role','birthday','bio','rank','XP','streak']

# Author: @Stickman230
# Serializer for retrieving role related to username      
class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username','role']
        
# Author: @Utzo-Main
# Serializer for retrieving quest type information
class QuestTypeGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestType
        fields = ('questTypeID','name','description')
        
# Author: @Utzo-Main
# Serializer for adding a new quest type
class QuestTypeAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestType
        fields = ('name','description')

# Author: @Stickman230
# Serializer for retrieving quest information
class QuestGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('questID','user','questTypeID','name','date_created','task','locationID','state','reward','imgURL')

# Author: @Stickman230
# Serializer for adding quest information
class QuestAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('user','questTypeID','locationID','name','task','reward','state','imgURL')
        
# Author: @Stickman230
# Serializer for retrieving location information
class LocationGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('locationID','name','latitude','longitude')

# Author: @Stickman230
# Serializer for adding a new location
class LocationAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('name','latitude','longitude')

# Author: @Stickman230
# Serializer for retrieving society information
class SocietyGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        verbose_name_plural = "Societies"
        fields = ('societyID','name','description','numberOfMembers','societyXP')

# Author: @Stickman230
# Serializer for adding a new society
class SocietyAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        verbose_name_plural = "Societies"
        fields = ('name','description')

# Author: @Stickman230
# Serializer for retrieving membership information
class MembershipGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('membershipID','societyID','since','state')

# Author: @Stickman230
# Serializer for adding a new membership
class MembershipAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('user','societyID','state')

# Author: @charlesmentuni
# Serializer for managing friends relationships
class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('user1','user2')

# Authors: @Utzo-Main, @Stickman230 
# Serializer for retrieving all images with basic information
class AllImageGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['imageID','image','name','description']

# Authors: @Stickman230 
# Serializer for uploading images
class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'name', 'description']

# Authors: @Utzo-Main, @Stickman230 
# Serializer for getting a single image URL
class ImageGetSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Image
        fields = ['image_url',]
        
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None