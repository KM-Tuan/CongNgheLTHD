from rest_framework import permissions

class OwnerPermission(permissions.IsAuthenticated):
    def has_objects_permission(self, request, view, comment):
        return super.has_permission(request, view) and request.user == comment.user

