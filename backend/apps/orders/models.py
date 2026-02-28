import uuid
from django.db import models
from apps.crops.models import Crop
from apps.farmers.models import Farmer

class OrderStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    CONFIRMED = 'confirmed', 'Confirmed'
    CANCELLED = 'cancelled', 'Cancelled'
    COMPLETED = 'completed', 'Completed'

class OrderRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    crop = models.ForeignKey(Crop, on_delete=models.RESTRICT, related_name='order_requests')
    farmer = models.ForeignKey(Farmer, on_delete=models.RESTRICT, related_name='order_requests')
    buyer_name = models.CharField(max_length=255)
    buyer_phone = models.CharField(max_length=30)
    quantity_requested = models.DecimalField(max_digits=10, decimal_places=2)
    preferred_contact_time = models.CharField(max_length=100, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=OrderStatus.choices, default=OrderStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'order_requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"Order for {self.crop.name} by {self.buyer_name}"
