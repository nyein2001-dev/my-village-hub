from rest_framework import viewsets, permissions
from .models import Festival, YouthBlogPost, VillageHistory, HistoryTimelineEvent, NotableFigure, PhotoGallery
from .serializers import (
    FestivalSerializer, YouthBlogPostSerializer, VillageHistorySerializer,
    HistoryTimelineEventSerializer, NotableFigureSerializer, PhotoGallerySerializer
)

class PublicReadOnlyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_authenticated and hasattr(self.serializer_class.Meta.model, 'is_published'):
            return queryset.filter(is_published=True)
        return queryset

class FestivalViewSet(PublicReadOnlyViewSet):
    queryset = Festival.objects.all().order_by('-start_date')
    serializer_class = FestivalSerializer

class YouthBlogPostViewSet(PublicReadOnlyViewSet):
    queryset = YouthBlogPost.objects.all().order_by('-published_date')
    serializer_class = YouthBlogPostSerializer

class VillageHistoryViewSet(PublicReadOnlyViewSet):
    queryset = VillageHistory.objects.all()
    serializer_class = VillageHistorySerializer

class HistoryTimelineEventViewSet(viewsets.ModelViewSet):
    queryset = HistoryTimelineEvent.objects.all().order_by('display_order')
    serializer_class = HistoryTimelineEventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['history']

class NotableFigureViewSet(PublicReadOnlyViewSet):
    queryset = NotableFigure.objects.all().order_by('birth_year')
    serializer_class = NotableFigureSerializer
    filterset_fields = ['history']

class PhotoGalleryViewSet(PublicReadOnlyViewSet):
    queryset = PhotoGallery.objects.all().order_by('-created_at')
    serializer_class = PhotoGallerySerializer
    filterset_fields = ['category']
