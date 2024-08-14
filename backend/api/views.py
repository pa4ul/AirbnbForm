import os
from django.shortcuts import render
from django.views import View
from rest_framework import viewsets
from .models import Guestsheet
from .serializers import GuestInfoSerializer
from django.http import FileResponse, Http404
from django.conf import settings

class GuestSheetViewSet(viewsets.ModelViewSet):
    queryset = Guestsheet.objects.all()
    serializer_class = GuestInfoSerializer

class GuestSheetPDFView(View):
    def get(self, request, filename, *args, **kwargs):
        # Definieren Sie den Pfad zur PDF-Datei
        pdf_path = os.path.join(os.path.abspath(os.getcwd()), 'pdfs', filename)
        # Überprüfen Sie, ob die Datei existiert
        if not os.path.isfile(pdf_path):
            raise Http404("PDF not found")

        # Öffnen Sie die Datei im Binärmodus und geben Sie sie zurück
        return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')