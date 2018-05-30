from django.conf.urls import include, url
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'field' , fieldViewSet , base_name = 'field')
router.register(r'genericProduct' , genericProductViewSet , base_name = 'genericProduct')
router.register(r'media' , mediaViewSet , base_name = 'media')
router.register(r'listing' , listingViewSet , base_name = 'listing')
router.register(r'listingLite' , listingLiteViewSet , base_name = 'listing')
router.register(r'category' , CategoryViewSet , base_name = 'category')


urlpatterns = [
    url(r'^', include(router.urls)),

]
