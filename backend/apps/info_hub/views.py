from rest_framework import viewsets, permissions
from .models import MarketPrice, Announcement, EmergencyContact
from .serializers import MarketPriceSerializer, AnnouncementSerializer, EmergencyContactSerializer

class PublicReadOnlyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_authenticated and hasattr(self.serializer_class.Meta.model, 'is_published'):
            return queryset.filter(is_published=True)
        return queryset

class MarketPriceViewSet(PublicReadOnlyViewSet):
    queryset = MarketPrice.objects.all().order_by('-price_date', '-created_at')
    serializer_class = MarketPriceSerializer
    filterset_fields = ['crop_name']

class AnnouncementViewSet(PublicReadOnlyViewSet):
    queryset = Announcement.objects.all().order_by('-is_pinned', '-created_at')
    serializer_class = AnnouncementSerializer
    filterset_fields = ['category']

class EmergencyContactViewSet(PublicReadOnlyViewSet):
    queryset = EmergencyContact.objects.all().order_by('category', 'name')
    serializer_class = EmergencyContactSerializer
    filterset_fields = ['category']
