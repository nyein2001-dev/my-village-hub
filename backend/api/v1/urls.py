from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.authentication.views import UserViewSet, RoleViewSet, CustomTokenObtainPairView, MediaViewSet
from apps.farmers.views import FarmerViewSet
from apps.crops.views import CropViewSet
from apps.orders.views import OrderRequestViewSet
from apps.archive.views import FestivalViewSet, YouthBlogPostViewSet, VillageHistoryViewSet, HistoryTimelineEventViewSet, NotableFigureViewSet, PhotoGalleryViewSet
from apps.info_hub.views import MarketPriceViewSet, AnnouncementViewSet, EmergencyContactViewSet
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'roles', RoleViewSet, basename='roles')
router.register(r'media', MediaViewSet, basename='media')
router.register(r'farmers', FarmerViewSet, basename='farmers')
router.register(r'crops', CropViewSet, basename='crops')
router.register(r'orders', OrderRequestViewSet, basename='orders')

# Archive
router.register(r'festivals', FestivalViewSet, basename='festivals')
router.register(r'blog-posts', YouthBlogPostViewSet, basename='blog-posts')
router.register(r'village-history', VillageHistoryViewSet, basename='village-history')
router.register(r'timeline-events', HistoryTimelineEventViewSet, basename='timeline-events')
router.register(r'notable-figures', NotableFigureViewSet, basename='notable-figures')
router.register(r'gallery', PhotoGalleryViewSet, basename='gallery')

# Info Hub
router.register(r'market-prices', MarketPriceViewSet, basename='market-prices')
router.register(r'announcements', AnnouncementViewSet, basename='announcements')
router.register(r'emergency-contacts', EmergencyContactViewSet, basename='emergency-contacts')

urlpatterns = [
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
