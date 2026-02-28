from rest_framework import serializers
from .models import Farmer
from apps.authentication.serializers import UserSerializer, MediaSerializer

class FarmerSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)
    photo_detail = MediaSerializer(source='photo', read_only=True)

    class Meta:
        model = Farmer
        fields = ['id', 'user', 'user_detail', 'full_name', 'phone', 'village_area', 'bio', 'photo', 'photo_detail', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
