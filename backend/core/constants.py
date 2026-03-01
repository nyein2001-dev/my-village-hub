from enum import Enum

class UserRole(str, Enum):
    ADMIN = 'admin'
    CONTENT_EDITOR = 'content_editor'
    FARMER = 'farmer'

    @classmethod
    def choices(cls):
        return [
            (cls.ADMIN.value, 'Admin'),
            (cls.CONTENT_EDITOR.value, 'Content Editor'),
            (cls.FARMER.value, 'Farmer')
        ]
