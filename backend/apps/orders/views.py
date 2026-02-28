from rest_framework import viewsets, permissions
from .models import OrderRequest
from .serializers import OrderRequestSerializer, OrderRequestAdminSerializer

class OrderRequestViewSet(viewsets.ModelViewSet):
    queryset = OrderRequest.objects.all().order_by('-created_at')
    filterset_fields = ['status', 'farmer', 'crop']
    search_fields = ['buyer_name', 'buyer_phone']
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.user.is_authenticated and (self.request.user.roles.filter(name='admin').exists() or self.action in ['update', 'partial_update']):
            return OrderRequestAdminSerializer
        return OrderRequestSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        if not user.is_authenticated:
            return queryset.none()
            
        if user.roles.filter(name='admin').exists():
            return queryset
            
        if hasattr(user, 'farmer'):
            return queryset.filter(farmer=user.farmer)
            
        return queryset.none()
