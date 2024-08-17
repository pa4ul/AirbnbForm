from .common import *

DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
#SECRET_KEY = 'django-insecure-x+44hkc*qw8pwufoydbbxn+bh82(0z88@0burr=r3j-dds!s=-'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases
ALLOWED_HOSTS = ["*"]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME' : 'Airbnbform',
        'HOST':'localhost',
        'USER':'root',
        'PASSWORD':'rootroot'
    }
}