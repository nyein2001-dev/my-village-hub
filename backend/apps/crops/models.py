import uuid
from django.db import models
from apps.farmers.models import Farmer
from apps.authentication.models import Media

class CropCategory(models.TextChoices):
    ONION = 'onion', 'Onion'
    SESAME = 'sesame', 'Sesame'
    RICE = 'rice', 'Rice'
    BEAN = 'bean', 'Bean'
    CORN = 'corn', 'Corn'
    VEGETABLE = 'vegetable', 'Vegetable'
    FRUIT = 'fruit', 'Fruit'
    HERB = 'herb', 'Herb'
    OTHER = 'other', 'Other'

class MonthName(models.TextChoices):
    JANUARY = 'january', 'January'
    FEBRUARY = 'february', 'February'
    MARCH = 'march', 'March'
    APRIL = 'april', 'April'
    MAY = 'may', 'May'
    JUNE = 'june', 'June'
    JULY = 'july', 'July'
    AUGUST = 'august', 'August'
    SEPTEMBER = 'september', 'September'
    OCTOBER = 'october', 'October'
    NOVEMBER = 'november', 'November'
    DECEMBER = 'december', 'December'

class Crop(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    farmer = models.ForeignKey(Farmer, on_delete=models.RESTRICT, related_name='crops')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CropCategory.choices, default=CropCategory.OTHER)
    description = models.TextField(null=True, blank=True)
    quantity_available = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    unit = models.CharField(max_length=50, null=True, blank=True)
    image = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'crops'

    def __str__(self):
        return self.name

class CropHarvestMonth(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='harvest_months')
    month = models.CharField(max_length=20, choices=MonthName.choices)

    class Meta:
        db_table = 'crop_harvest_months'
        unique_together = ('crop', 'month')

    def __str__(self):
        return f"{self.crop.name} - {self.get_month_display()}"
