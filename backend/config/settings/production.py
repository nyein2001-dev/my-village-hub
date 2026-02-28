from .base import *

DEBUG = env.bool('DEBUG', default=False)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['.vercel.app', 'localhost'])

import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=env('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}
if 'OPTIONS' not in DATABASES['default']:
    DATABASES['default']['OPTIONS'] = {}
DATABASES['default']['OPTIONS']['options'] = '-c search_path=public'

CORS_ALLOWED_ORIGINS = [
    "https://taung-ywar-ma.vercel.app",
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True
