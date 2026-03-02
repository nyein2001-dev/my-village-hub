from rest_framework import serializers
from core.middleware import get_current_locale

class LocalizedModelSerializerMixin:
    """
    Mixin for Django REST Framework ModelSerializers.
    Automatically replaces base content fields with their '_en' equivalents 
    if the requested locale is English and the '_en' content exists.
    """
    def to_representation(self, instance):
        # We assume the parent class is a Serializer that has to_representation
        data = super().to_representation(instance)  # type: ignore
        locale = get_current_locale()
        
        if locale == 'en':
            keys = list(data.keys())
            for key in keys:
                en_key = f"{key}_en"
                # If _en field exists in the serialized data and is populated, override base field
                if en_key in data and data[en_key]:
                    data[key] = data[en_key]
        
        return data
