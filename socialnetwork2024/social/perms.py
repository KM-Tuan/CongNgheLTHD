from rest_framework import permissions
from rest_framework.permissions import BasePermission

class OwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, instance):
        return super().has_permission(request, view) and request.user == instance.user


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsLecturer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'lecturer'

class IsAlumni(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'alumni'