from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GuestSheetViewSet

router = DefaultRouter()
router.register(r'guestsheet', GuestSheetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]