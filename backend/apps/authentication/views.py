from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import CustomTokenObtainPairSerializer, UserSerializer, UserCreateSerializer, RoleSerializer
from .models import Role

User = get_user_model()

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.roles.filter(name='admin').exists())

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminUser]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

from .models import Media
from .serializers import MediaSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        file = self.request.data.get('file_path')
        alt_text = self.request.data.get('alt_text')
        if file:
            serializer.save(
                uploaded_by=self.request.user,
                file_name=file.name,
                file_size=file.size,
                mime_type=file.content_type,
                alt_text=alt_text
            )
        else:
            serializer.save(uploaded_by=self.request.user, alt_text=alt_text)

