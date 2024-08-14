import os
from django.shortcuts import render
from django.views import View
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Guestsheet
from .serializers import GuestInfoSerializer
from django.http import FileResponse, Http404
from django.conf import settings
from rest_framework.permissions import BasePermission, IsAuthenticated

class IsAuthenticatedOrCreate(BasePermission):
    """
    Erlaubt nur authentifizierten Benutzern den Zugriff auf die Liste der Ressourcen.
    Erlaubt jedem Benutzer das Erstellen neuer Ressourcen.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated


class GuestSheetViewSet(viewsets.ModelViewSet):
    queryset = Guestsheet.objects.all()
    serializer_class = GuestInfoSerializer
    permission_classes = [IsAuthenticatedOrCreate]

class GuestSheetPDFView(View):
    def get(self, request, filename, *args, **kwargs):
        # Definieren Sie den Pfad zur PDF-Datei
        pdf_path = os.path.join(os.path.abspath(os.getcwd()), 'pdfs', filename)
        # Überprüfen Sie, ob die Datei existiert
        if not os.path.isfile(pdf_path):
            raise Http404("PDF not found")

        # Öffnen Sie die Datei im Binärmodus und geben Sie sie zurück
        return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')