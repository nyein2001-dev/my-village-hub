import threading

# A thread-local to store request-scoped data (like locale)
_thread_locals = threading.local()

def get_current_locale() -> str:
    return getattr(_thread_locals, 'locale', 'mm')

class LocaleMiddleware:
    """
    Middleware to extract the requested locale from headers
    and safely store it in thread-local storage for use deep
    in the execution stack (e.g. models, serializers).
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Priority 1: Custom X-Language header
        locale = request.headers.get('X-Language', None)
        
        # Priority 2: Accept-Language (simplistic parsing for MVP)
        if not locale:
            accept_lang = request.headers.get('Accept-Language', '')
            if 'en' in accept_lang.lower():
                locale = 'en'
            else:
                locale = 'mm' # Default
        
        # Normalize
        locale = 'en' if locale == 'en' else 'mm'
        
        # Set thread_local
        _thread_locals.locale = locale
        
        response = self.get_response(request)
        
        # Cleanup
        if hasattr(_thread_locals, 'locale'):
            del _thread_locals.locale
            
        return response
