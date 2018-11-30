"""
Django settings for libreERP project.

Generated by 'django-admin startproject' using Django 1.8.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from django.contrib.messages import constants as messages

MESSAGE_TAGS = {
    messages.ERROR: 'danger'
}

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEFAULT_APPS_ON_REGISTER = ['app.tutor.account' , 'app.tutor.previousSessions' , 'app.tutor.studentHome']
# the apps to which the user will be given access to upon registeration through public registeration site

ON_REGISTRATION_SUCCESS_REDIRECT = '/ERP' # when signup using google the user will be redirected to this url

SITE_ADDRESS = 'http://24tutors.com' # the url prefix of the site

ROOT_APP = 'index' # the default app
ECOMMERCE_APP = {
    'ui': 'food', # the options can be food , rental, shop
    # food UI is like Fassos or Zomatto
    # rental UI is like zoomcar
    # shop UI is like Amazon
    'offtime':[23, 9],
}

LOGIN_PAGE_IMAGE = '/static/images/foodfLogin.png'


LOGIN_URL = 'login' # this can be 'login' or 'account_login'
REGISTER_URL = 'register' # this can be 'register' or 'account_signup'

LOGIN_TEMPLATE = 'loginCenter.html'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'apfwdssalfeag7)cp4jve5gfb%l8wbn4cyvym(tez^m@z1o#3f'

GITOLITE_KEY = '123' # the gitolite server push notification secret key, all git operations are
# computationaly heavy and can be used to overload with git operations. So the server will have
# to pass this key in the HTTP request

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['192.168.1.100', 'cioc.co.in', 'localhost', '127.0.0.1', '192.168.0.105', '192.168.0.105' ,'172.20.10.8' , '24tutors.com']


LOGIN_REDIRECT = 'ERP' # the url to which the user will be redirected once successfully loggedin
# Options are : ERP , ecommerce , blogs , corporate

LOGOUT_REDIRECT = 'root' # similarly the url to which the user will be directed one logged out

USE_CDN = False # when turned on the application will use the cndjs.com and other similar
#content delivery network for css and jss libraries
# Application definition
BRAND_NAME = '24Tutors.com'
SERVICE_NAME = 'Online Tutoring anytime, anywhere'
BRAND_LOGO = '/static/images/24_tutors_icon.svg'
BRAND_LOGO_INVERT = '/static/images/24_tutors_icon_invert_white.svg'

SMS_API_PREFIX = "http://sms.azmobia.com/http-api.php?username=CIOC&password=cioc567&senderid=CIOCPL&route=1&"

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'rest_framework',
    'corsheaders',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',
    'bootstrapform',
    'robots',
    'API', # uncategorised REST points
    'ERP', # permissions, overall management of the platform
    'homepage', # landing page
    'HR', # people aspect of the platform
    'LMS',# LMS
    'PIM', # personal information manager
	'tutor',# canvas
    # 'projectManagement',
    # 'mail', # mail application
    # 'social', # social networking client
	# 'logistic',# logistics
    # 'organization',# organization
    # 'performance',# performance
    # 'gitweb', # github.com local server with file browsing and diff viewer
    # 'projects',
    # 'workforceManagement',# canvas
    # 'taskBoard',
    # 'recruitment',# recruitment
    # 'employees',# employees details
    # 'businessManagement', # BM application
    # 'support',# canvas
    # 'tools',# general purpose tools like OCR, AI or big data related stuffs
    # 'finance',# billing , invoicing , finance etc
    # 'events',# to manage events like test, hackathon or something like that
    # 'virtualWorkforce',
	# 'assets',# assets
    # 'clientRelationships',# CRM like sales force
    # 'ecommerce', # ecommerce
    # 'POS',# POS terminal like tally
    # 'payroll',# payroll
	# 'productsInventory',# inventory for POS products
    # 'warehouse',# warehouse application
)


SITE_ID = 1

ACCOUNT_ADAPTER = 'ERP.views.AccountAdapter'

SOCIALACCOUNT_PROVIDERS = \
        {'google':
            { 'SCOPE': ['profile', 'email'],
            'AUTH_PARAMS': { 'access_type': 'online' } },
        'facebook':
            {'METHOD': 'oauth2',
            'SCOPE': ['email', 'public_profile', 'user_friends'],
            'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
            'FIELDS': [
                'id',
                'email',
                'name',
                'first_name',
                'last_name',
                'verified',
                'locale',
                'timezone',
                'link',
                'gender',
                'updated_time'],
            'EXCHANGE_TOKEN': True,
            'LOCALE_FUNC': lambda request: 'en_US',
            'VERIFIED_EMAIL': False,
            'VERSION': 'v2.4'}
        }

ACCOUNT_USER_MODEL_USERNAME_FIELD = 'email'
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'username'
SOCIALACCOUNT_AUTO_SIGNUP = True
SOCIALACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = False

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'API.middleware.simple_middleware',
)

ROOT_URLCONF = 'libreERP.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'HR', 'templates'),
            os.path.join(BASE_DIR, 'libreERP', 'templates'),
            os.path.join(BASE_DIR, 'ecommerce', 'templates'),
            os.path.join(BASE_DIR, 'clientRelationships', 'templates'),
            os.path.join(BASE_DIR, 'LMS', 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
                'libreERP.settings_context.global_settings',
            ],
        },
    },
]

WSGI_APPLICATION = 'libreERP.wsgi.application'


AUTHENTICATION_BACKENDS = (
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
)


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'django',
#         'USER': 'root',
#         'PASSWORD': 'password',
#         'HOST': '127.0.0.1',   # Or an IP Address that your DB is hosted on
#         'PORT': '3306',
#     }
# }


# AUTH_PROFILE_MODULE = 'HR.userProfile'
# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

EMAIL_HOST_SUFFIX = '24tutors.com'

EMAIL_HOST = 'email.cioc.in'
EMAIL_HOST_USER = 'do_not_reply@24tutors.com'
EMAIL_HOST_PASSWORD = '51GX4]N1_0uw'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_FROM_EMAIL = 'do_not_reply@24tutors.com'
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'

CORS_ORIGIN_ALLOW_ALL = False

CORS_ALLOW_HEADERS = (
    'x-requested-with',
    'content-type',
    'accept',
    'origin',
    'authorization',
    'X-CSRFToken'
)

CORS_ALLOW_CREDENTIALS = True

STATIC_ROOT = (
    os.path.join(BASE_DIR , 'static_root')
)
STATICFILES_DIRS = (
   os.path.join(BASE_DIR , 'static_shared'),
)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR , 'media_root')

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_METADATA_CLASS': 'rest_framework.metadata.SimpleMetadata',
    # 'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer',),
}

# WAMP_SERVER = 'pradeepyadav.net'
WAMP_SERVER = 'wamp.cioc.in'

PAYMENT_SUCCESS_REDIRECT ='http://24tutors.com/ERP/#/studentHome?mode=success'

PAYTM_MERCHANT_KEY = "pvB_a%zTlH81EA6p"
PAYTM_MERCHANT_ID = "CIOCFM10126867273379"

if DEBUG:
    PAYTM_MERCHANT_KEY = "pvB_a%zTlH81EA6p"
    PAYTM_MERCHANT_ID = "CIOCFM10126867273379"
    '''
    In sandbox enviornment you can use following wallet credentials to login and make payment.
    Mobile Number : 7777777777
    Password : Paytm12345
    This test wallet is topped-up to a balance of 7000 Rs. every 5 minutes.
    '''
