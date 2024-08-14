from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GuestSheetViewSet, GuestSheetPDFView


router = DefaultRouter()
router.register(r'guestsheet', GuestSheetViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('pdf/<str:filename>/', GuestSheetPDFView.as_view(), name='pdf-view'),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),

]