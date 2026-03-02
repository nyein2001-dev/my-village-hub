from rest_framework import serializers
from .models import Festival, YouthBlogPost, VillageHistory, HistoryTimelineEvent, NotableFigure, PhotoGallery
from apps.authentication.serializers import MediaSerializer, UserSerializer
from core.serializers import LocalizedModelSerializerMixin

class FestivalSerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    cover_image_detail = MediaSerializer(source='cover_image', read_only=True)

    class Meta:
        model = Festival
        fields = '__all__'

class YouthBlogPostSerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    cover_image_detail = MediaSerializer(source='cover_image', read_only=True)
    author_detail = UserSerializer(source='author', read_only=True)

    class Meta:
        model = YouthBlogPost
        fields = '__all__'

class HistoryTimelineEventSerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    image_detail = MediaSerializer(source='image', read_only=True)

    class Meta:
        model = HistoryTimelineEvent
        fields = '__all__'

class NotableFigureSerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    photo_detail = MediaSerializer(source='photo', read_only=True)

    class Meta:
        model = NotableFigure
        fields = '__all__'

class VillageHistorySerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    timeline_events = HistoryTimelineEventSerializer(many=True, read_only=True)
    notable_figures = NotableFigureSerializer(many=True, read_only=True)

    class Meta:
        model = VillageHistory
        fields = '__all__'

class PhotoGallerySerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    image_detail = MediaSerializer(source='image', read_only=True)

    class Meta:
        model = PhotoGallery
        fields = '__all__'
