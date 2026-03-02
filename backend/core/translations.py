from enum import Enum

class TranslationKey(str, Enum):
    # Auth
    AUTH_LOGIN_TITLE = "auth.login.title"
    AUTH_LOGIN_BUTTON = "auth.login.button"
    AUTH_ERROR_INVALID_CREDS = "auth.error.invalid_creds"
    AUTH_ERROR_DEACTIVATED = "auth.error.deactivated"
    AUTH_ERROR_MISSING_EMAIL = "auth.error.missing_email"
    AUTH_ERROR_MISSING_PASSWORD = "auth.error.missing_password"

    # Validation
    VALIDATION_ERROR_REQUIRED = "validation.error.required"
    VALIDATION_ERROR_EMAIL = "validation.error.email"
    VALIDATION_ERROR_PHONE = "validation.error.phone"
    VALIDATION_ERROR_MIN_LENGTH = "validation.error.min_length"
    VALIDATION_ERROR_MAX_LENGTH = "validation.error.max_length"
    VALIDATION_ERROR_FILE_TYPE = "validation.error.file_type"
    VALIDATION_ERROR_FILE_SIZE = "validation.error.file_size"

    # Common
    COMMON_SUCCESS = "common.success"
    COMMON_ERROR = "common.error"
    COMMON_NOT_FOUND = "common.not_found"
    COMMON_FORBIDDEN = "common.forbidden"
    
    # Specific API Messages
    USER_CREATED_SUCCESS = "user.created.success"
    USER_UPDATED_SUCCESS = "user.updated.success"
    USER_DELETED_SUCCESS = "user.deleted.success"
    CROP_CREATED_SUCCESS = "crop.created.success"
    ORDER_SUBMITTED_SUCCESS = "order.submitted.success"

# Dictionaries
EN_TRANSLATIONS = {
    TranslationKey.AUTH_LOGIN_TITLE: "Sign In",
    TranslationKey.AUTH_LOGIN_BUTTON: "Sign In",
    TranslationKey.AUTH_ERROR_INVALID_CREDS: "Incorrect email or password.",
    TranslationKey.AUTH_ERROR_DEACTIVATED: "Your account has been deactivated. Please contact the administrator.",
    TranslationKey.AUTH_ERROR_MISSING_EMAIL: "Email is required.",
    TranslationKey.AUTH_ERROR_MISSING_PASSWORD: "Password is required.",
    TranslationKey.VALIDATION_ERROR_REQUIRED: "This field is required.",
    TranslationKey.VALIDATION_ERROR_EMAIL: "Please enter a valid email address.",
    TranslationKey.VALIDATION_ERROR_PHONE: "Please enter a valid phone number.",
    TranslationKey.VALIDATION_ERROR_MIN_LENGTH: "Minimum length not met.",
    TranslationKey.VALIDATION_ERROR_MAX_LENGTH: "Maximum length exceeded.",
    TranslationKey.VALIDATION_ERROR_FILE_TYPE: "Only JPG, PNG, or WEBP files are allowed.",
    TranslationKey.VALIDATION_ERROR_FILE_SIZE: "File size must not exceed 5 MB.",
    TranslationKey.COMMON_SUCCESS: "Success",
    TranslationKey.COMMON_ERROR: "Error",
    TranslationKey.COMMON_NOT_FOUND: "Resource not found.",
    TranslationKey.COMMON_FORBIDDEN: "You do not have permission to perform this action.",
    TranslationKey.USER_CREATED_SUCCESS: "User account created successfully.",
    TranslationKey.USER_UPDATED_SUCCESS: "User updated successfully.",
    TranslationKey.USER_DELETED_SUCCESS: "User deleted successfully.",
    TranslationKey.CROP_CREATED_SUCCESS: "Crop created successfully.",
    TranslationKey.ORDER_SUBMITTED_SUCCESS: "Your order request has been submitted.",
}

MM_TRANSLATIONS = {
    TranslationKey.AUTH_LOGIN_TITLE: "အကောင့်ဝင်ရန်",
    TranslationKey.AUTH_LOGIN_BUTTON: "အကောင့်ဝင်မည်",
    TranslationKey.AUTH_ERROR_INVALID_CREDS: "အီးမေးလ် သို့မဟုတ် စကားဝှက်မှားယွင်းနေပါသည်။",
    TranslationKey.AUTH_ERROR_DEACTIVATED: "သင့်အကောင့်ကို ပိတ်ထားပါသည်။",
    TranslationKey.AUTH_ERROR_MISSING_EMAIL: "အီးမေးလ်လိုအပ်ပါသည်။",
    TranslationKey.AUTH_ERROR_MISSING_PASSWORD: "စကားဝှက်လိုအပ်ပါသည်။",
    TranslationKey.VALIDATION_ERROR_REQUIRED: "ဤအချက်အလက်လိုအပ်ပါသည်။",
    TranslationKey.VALIDATION_ERROR_EMAIL: "မှန်ကန်သောအီးမေးလ် ထည့်သွင်းပါ။",
    TranslationKey.VALIDATION_ERROR_PHONE: "မှန်ကန်သောဖုန်းနံပါတ် ထည့်သွင်းပါ။",
    TranslationKey.VALIDATION_ERROR_MIN_LENGTH: "အနည်းဆုံးစာလုံးအရေအတွက် မပြည့်မီပါ။",
    TranslationKey.VALIDATION_ERROR_MAX_LENGTH: "အများဆုံးစာလုံးအရေအတွက် ကျော်လွန်နေပါသည်။",
    TranslationKey.VALIDATION_ERROR_FILE_TYPE: "JPG, PNG နှင့် WEBP ဖိုင်များသာ ခွင့်ပြုသည်။",
    TranslationKey.VALIDATION_ERROR_FILE_SIZE: "ဖိုင်အရွယ်အစား 5 MB ထက်မပိုရပါ။",
    TranslationKey.COMMON_SUCCESS: "အောင်မြင်ပါသည်",
    TranslationKey.COMMON_ERROR: "အမှားအယွင်း",
    TranslationKey.COMMON_NOT_FOUND: "ရှာမတွေ့ပါ။",
    TranslationKey.COMMON_FORBIDDEN: "သင့်မှာ ဤစာမျက်နှာကိုဝင်ရောက်ကြည့်ရှုခွင့်မရှိပါ။",
    TranslationKey.USER_CREATED_SUCCESS: "အသုံးပြုသူအသစ်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ။",
    TranslationKey.USER_UPDATED_SUCCESS: "အသုံးပြုသူအချက်အလက်များကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။",
    TranslationKey.USER_DELETED_SUCCESS: "အသုံးပြုသူကို အောင်မြင်စွာ ဖျက်ပြီးပါပြီ။",
    TranslationKey.CROP_CREATED_SUCCESS: "သီးနှံအသစ်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ။",
    TranslationKey.ORDER_SUBMITTED_SUCCESS: "သင့်အမှာစာကို အောင်မြင်စွာ ပေးပို့ပြီးပါပြီ။",
}

def translate(key: TranslationKey, locale: str = 'mm') -> str:
    """
    Translates a TranslationKey into the requested locale (en or mm).
    Falls back to Burmese ('mm') as default, then to En.
    """
    if not isinstance(key, TranslationKey):
        # Prevent any raw string translation calls
        raise TypeError(f"Key {key} must be a TranslationKey enum.")
        
    locale = locale.lower()
    
    if locale == 'en':
        return EN_TRANSLATIONS.get(key, MM_TRANSLATIONS.get(key, key.value))
    
    # Default is 'mm'
    return MM_TRANSLATIONS.get(key, EN_TRANSLATIONS.get(key, key.value))
