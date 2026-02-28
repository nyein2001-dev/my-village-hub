from .base import *

DEBUG = False

ALLOWED_HOSTS = ['taungywarma.com'] # Replace with actual domain

import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'taung_ywar_ma'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', '1234'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5433'),
        'OPTIONS': {
            'options': '-c search_path=public'
        }
    }
}
