from rest_framework.views import exception_handler
from rest_framework.exceptions import (
    ValidationError, 
    AuthenticationFailed, 
    NotAuthenticated, 
    PermissionDenied,
    NotFound
)
from core.translations import translate, TranslationKey
from core.middleware import get_current_locale

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        locale = get_current_locale()
        
        # Map DRF and SimpleJWT standard error exceptions to our Enum-driven translations
        if isinstance(exc, ValidationError):
            if isinstance(response.data, dict):
                for key, value in response.data.items():
                    if isinstance(value, list):
                        new_msgs = []
                        for msg in value:
                            msg_str = str(msg).lower()
                            # Basic string matching to map DRF defaults to our Enum
                            if "required" in msg_str or "may not be null" in msg_str or "may not be blank" in msg_str:
                                new_msgs.append(translate(TranslationKey.VALIDATION_ERROR_REQUIRED, locale))
                            elif "valid email" in msg_str:
                                new_msgs.append(translate(TranslationKey.VALIDATION_ERROR_EMAIL, locale))
                            elif "ensure this field has at least" in msg_str:
                                new_msgs.append(translate(TranslationKey.VALIDATION_ERROR_MIN_LENGTH, locale))
                            elif "ensure this field has no more than" in msg_str:
                                new_msgs.append(translate(TranslationKey.VALIDATION_ERROR_MAX_LENGTH, locale))
                            else:
                                # Fallback if unrecognized
                                new_msgs.append(msg)
                        response.data[key] = new_msgs

        elif isinstance(exc, AuthenticationFailed):
            # SimpleJWT returns "No active account found with the given credentials"
            msg_str = str(exc).lower()
            if "with the given credentials" in msg_str:
                response.data['detail'] = translate(TranslationKey.AUTH_ERROR_INVALID_CREDS, locale)
            elif "user is inactive" in msg_str:
                response.data['detail'] = translate(TranslationKey.AUTH_ERROR_DEACTIVATED, locale)
            else:
                response.data['detail'] = translate(TranslationKey.AUTH_ERROR_INVALID_CREDS, locale)
                
        elif isinstance(exc, NotAuthenticated):
            response.data['detail'] = translate(TranslationKey.AUTH_ERROR_INVALID_CREDS, locale)
            
        elif isinstance(exc, PermissionDenied):
            response.data['detail'] = translate(TranslationKey.COMMON_FORBIDDEN, locale)
            
        elif isinstance(exc, NotFound):
            response.data['detail'] = translate(TranslationKey.COMMON_NOT_FOUND, locale)

    return response
