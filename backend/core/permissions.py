from rest_framework import permissions
from .constants import UserRole

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.roles.filter(name=UserRole.ADMIN.value).exists())

class IsAdminOrContentEditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.roles.filter(name__in=[UserRole.ADMIN.value, UserRole.CONTENT_EDITOR.value]).exists())

class IsAdminOrContentEditorOrFarmerOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.roles.filter(name__in=[UserRole.ADMIN.value, UserRole.CONTENT_EDITOR.value]).exists():
            return True
        if hasattr(request.user, 'farmer'):
            return obj.farmer == request.user.farmer
        return False

class IsAdminOrFarmerOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_authenticated:
            return False
        if request.user.roles.filter(name=UserRole.ADMIN.value).exists():
            return True
        if request.user.roles.filter(name=UserRole.FARMER.value).exists():
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.roles.filter(name=UserRole.ADMIN.value).exists():
            return True
        if request.user.roles.filter(name=UserRole.CONTENT_EDITOR.value).exists() and not request.user.roles.filter(name=UserRole.ADMIN.value).exists():
            return False
        if hasattr(request.user, 'farmer'):
            from apps.farmers.models import Farmer
            if isinstance(obj, Farmer):
                return obj.user == request.user
            if hasattr(obj, 'farmer'): 
                return obj.farmer.user == request.user
        return False

class BlockContentEditor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user and request.user.is_authenticated:
            if request.user.roles.filter(name=UserRole.CONTENT_EDITOR.value).exists() and not request.user.roles.filter(name=UserRole.ADMIN.value).exists():
                return False
        return True
