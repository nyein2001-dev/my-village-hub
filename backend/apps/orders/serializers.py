from rest_framework import serializers
from .models import OrderRequest
from apps.crops.serializers import CropSerializer
from apps.farmers.serializers import FarmerSerializer

class OrderRequestSerializer(serializers.ModelSerializer):
    crop_detail = CropSerializer(source='crop', read_only=True)
    farmer_detail = FarmerSerializer(source='farmer', read_only=True)

    class Meta:
        model = OrderRequest
        fields = [
            'id', 'crop', 'crop_detail', 'farmer', 'farmer_detail', 
            'buyer_name', 'buyer_phone', 'quantity_requested', 
            'preferred_contact_time', 'notes', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'status']

class OrderRequestAdminSerializer(serializers.ModelSerializer):
    crop_detail = CropSerializer(source='crop', read_only=True)
    farmer_detail = FarmerSerializer(source='farmer', read_only=True)

    class Meta:
        model = OrderRequest
        fields = [
            'id', 'crop', 'crop_detail', 'farmer', 'farmer_detail', 
            'buyer_name', 'buyer_phone', 'quantity_requested', 
            'preferred_contact_time', 'notes', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
