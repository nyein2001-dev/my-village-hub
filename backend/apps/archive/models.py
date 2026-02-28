import uuid
from django.db import models
from apps.authentication.models import User, Media

class GalleryCategory(models.TextChoices):
    FESTIVAL = 'festival', 'Festival'
    YOUTH_ACTIVITY = 'youth_activity', 'Youth Activity'
    VILLAGE_LIFE = 'village_life', 'Village Life'
    AGRICULTURE = 'agriculture', 'Agriculture'
    HERITAGE = 'heritage', 'Heritage'
    OTHER = 'other', 'Other'

class Festival(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    cover_image = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'festivals'

    def __str__(self):
        return self.name

class YouthBlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    cover_image = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, blank=True)
    content = models.TextField()
    published_date = models.DateField(null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'youth_blog_posts'

    def __str__(self):
        return self.title

class VillageHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    founding_story = models.TextField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'village_history'

class HistoryTimelineEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    history = models.ForeignKey(VillageHistory, on_delete=models.CASCADE, related_name='timeline_events')
    event_year = models.IntegerField(null=True, blank=True)
    event_date = models.DateField(null=True, blank=True)
    title = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    image = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, blank=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'history_timeline_events'
        ordering = ['display_order']

class NotableFigure(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    history = models.ForeignKey(VillageHistory, on_delete=models.CASCADE, related_name='notable_figures')
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    photo = models.ForeignKey(Media, on_delete=models.SET_NULL, null=True, blank=True)
    birth_year = models.IntegerField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'notable_figures'

class PhotoGallery(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ForeignKey(Media, on_delete=models.RESTRICT)
    caption = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, choices=GalleryCategory.choices, default=GalleryCategory.OTHER)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'photo_gallery'
