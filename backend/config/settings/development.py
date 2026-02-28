from .base import *

DEBUG = env.bool('DEBUG', default=True)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=env('DATABASE_URL', default='postgres://postgres:1234@localhost:5433/taung_ywar_ma'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}
DATABASES['default']['OPTIONS'] = {'options': '-c search_path=public'}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True
