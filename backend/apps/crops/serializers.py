from rest_framework import serializers
from .models import Crop, CropHarvestMonth
from apps.farmers.serializers import FarmerSerializer
from apps.authentication.serializers import MediaSerializer

class CropHarvestMonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropHarvestMonth
        fields = ['id', 'month']
        read_only_fields = ['id']

    def to_representation(self, instance):
        return instance.month

class CropSerializer(serializers.ModelSerializer):
    harvest_months = CropHarvestMonthSerializer(many=True, required=False)
    farmer_detail = FarmerSerializer(source='farmer', read_only=True)
    image_detail = MediaSerializer(source='image', read_only=True)

    class Meta:
        model = Crop
        fields = [
            'id', 'farmer', 'farmer_detail', 'name', 'category', 'description', 
            'quantity_available', 'unit', 'image', 'image_detail', 'is_published', 
            'harvest_months', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        harvest_months = validated_data.pop('harvest_months', [])
        crop = Crop.objects.create(**validated_data)
        for month_data in harvest_months:
            CropHarvestMonth.objects.create(crop=crop, month=month_data['month'])
        return crop

    def update(self, instance, validated_data):
        harvest_months = validated_data.pop('harvest_months', None)
        crop = super().update(instance, validated_data)
        
        if harvest_months is not None:
            instance.harvest_months.all().delete()
            for month_data in harvest_months:
                CropHarvestMonth.objects.create(crop=crop, month=month_data['month'])
                
        return crop
