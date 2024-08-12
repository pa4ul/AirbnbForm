from django.shortcuts import render
from rest_framework import viewsets
from .models import Guestsheet
from .serializers import GuestInfoSerializer

class GuestSheetViewSet(viewsets.ModelViewSet):
    queryset = Guestsheet.objects.all()
    serializer_class = GuestInfoSerializer
