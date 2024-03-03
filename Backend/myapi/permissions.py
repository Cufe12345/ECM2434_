'''
Authors: @Stickman230 - Maxime Reynaud, @charlesmentuni - Charles Ment 
Email: mpcr201@exeter.ac.uk, cm1099@exeter.ac.uk

This file defines who control permissions for modifing permissions
'''
from rest_framework import permissions

# Author: @Stickman230
# can set a role onl if loged in and admin
class CanSetRole(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        # Check if the user is a superuser or belongs to the GameKeeper or Developer groups
        if request.user.is_superuser or request.user.groups.filter(name='GameKeeper').exists() or request.user.groups.filter(name='Developer').exists():
            return True

        return False

# Author: @charlesmentuni
# add a user as developer     
class CanVerify(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        # Check if the user is a superuser or belongs to the GameKeeper or Developer groups
        if request.user.is_superuser or request.user.groups.filter(name='GameKeeper').exists() or request.user.groups.filter(name='Developer').exists():
            return True

        return False