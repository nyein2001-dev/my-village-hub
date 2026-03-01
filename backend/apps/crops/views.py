from rest_framework import viewsets, permissions
from .models import Crop
from .serializers import CropSerializer
from core.permissions import IsAdminOrContentEditorOrFarmerOwner
from core.constants import UserRole

class CropViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all().order_by('-created_at')
    serializer_class = CropSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdminOrContentEditorOrFarmerOwner]
    filterset_fields = ['category', 'is_published', 'farmer']
    search_fields = ['name', 'description']

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        if self.action == 'list':
            if not user.is_authenticated:
                return queryset.filter(is_published=True)
            # If authenticated, apply role-based filtering
            if user.roles.filter(name__in=[UserRole.ADMIN.value, UserRole.CONTENT_EDITOR.value]).exists():
                return queryset
            if hasattr(user, 'farmer'):
                # Admin UI list should only show their own. Public read will use unauthenticated mostly.
                # However, if farmer requests `list` but wants public published, we can just allow them to see all published plus their own.
                from django.db.models import Q
                return queryset.filter(Q(farmer=user.farmer) | Q(is_published=True))
        
        return queryset
