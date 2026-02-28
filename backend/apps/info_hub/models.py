import uuid
from django.db import models
from apps.authentication.models import User

class AnnouncementCategory(models.TextChoices):
    HEALTH = 'health', 'Health'
    AGRICULTURE = 'agriculture', 'Agriculture'
    COMMUNITY = 'community', 'Community'
    EMERGENCY = 'emergency', 'Emergency'
    DONATION = 'donation', 'Donation'
    OTHER = 'other', 'Other'

class MarketPrice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    crop_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    unit = models.CharField(max_length=50)
    market_name = models.CharField(max_length=255)
    price_date = models.DateField()
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'market_prices'
        ordering = ['-price_date']

class Announcement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    body = models.TextField()
    category = models.CharField(max_length=50, choices=AnnouncementCategory.choices, default=AnnouncementCategory.OTHER)
    is_pinned = models.BooleanField(default=False)
    expiry_date = models.DateField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'announcements'
        ordering = ['-created_at']

class EmergencyContact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    category = models.CharField(max_length=100)
    notes = models.TextField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'emergency_contacts'
