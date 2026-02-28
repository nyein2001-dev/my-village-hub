from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Role, UserRole

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        roles = user.roles.all().values_list('name', flat=True)
        token['roles'] = list(roles)
        return token
        
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        roles = user.roles.all().values_list('name', flat=True)
        
        data.update({
            'user': {
                'id': str(user.id),
                'email': user.email,
                'username': user.username,
                'roles': list(roles),
                'is_staff': user.is_staff
            }
        })
        return data

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Role.objects.all()
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'roles', 'created_at']
        read_only_fields = ['id', 'created_at']

class UserCreateSerializer(serializers.ModelSerializer):
    roles = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Role.objects.all()
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'roles', 'is_active']
        
    def create(self, validated_data):
        roles = validated_data.pop('roles', [])
        user = User.objects.create_user(**validated_data)
        for role in roles:
            UserRole.objects.create(user=user, role=role)
        return user

from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'file_name', 'file_path', 'file_size', 'mime_type', 'uploaded_by', 'created_at']
        read_only_fields = ['id', 'uploaded_by', 'created_at']

