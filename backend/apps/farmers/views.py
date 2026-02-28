from rest_framework import viewsets, permissions
from .models import Farmer
from .serializers import FarmerSerializer

class IsAdminOrSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.roles.filter(name='admin').exists():
            return True
        return obj.user == request.user

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdminOrSelf]
    filterset_fields = ['is_active', 'village_area']
    search_fields = ['full_name', 'phone']
