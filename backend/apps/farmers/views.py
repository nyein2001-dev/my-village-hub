from rest_framework import viewsets, permissions
from .models import Farmer
from .serializers import FarmerSerializer
from core.permissions import IsAdminOrFarmerOwner
from core.constants import UserRole

class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdminOrFarmerOwner]
    filterset_fields = ['is_active', 'village_area']
    search_fields = ['full_name', 'phone']

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        # Content Editor has "No Farmers CRUD". If they hit this, permission classes should ideally block them.
        # Wait, the spec says Content Editor can read, but maybe not list? The public needs rule.
        # Public needs to see farmers list for matching `is_active=True`.
        if self.action == 'list' and user.is_authenticated:
            # Content Editor gets nothing
            if user.roles.filter(name=UserRole.CONTENT_EDITOR.value).exists() and not user.roles.filter(name=UserRole.ADMIN.value).exists():
                return Farmer.objects.none()
            if hasattr(user, 'farmer') and not user.roles.filter(name=UserRole.ADMIN.value).exists():
                # Admin CMS uses filterset_fields, but farmer CMS should only show the farmer? Yes.
                return queryset.filter(user=user)
        return queryset
