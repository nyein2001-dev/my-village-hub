from rest_framework import serializers
from .models import MarketPrice, Announcement, EmergencyContact
from core.serializers import LocalizedModelSerializerMixin

class MarketPriceSerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = MarketPrice
        fields = '__all__'

class AnnouncementSerializer(LocalizedModelSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = '__all__'
