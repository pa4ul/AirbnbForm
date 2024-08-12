from rest_framework import serializers
from .models import Guestsheet

class GuestInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guestsheet
        fields = [
            'id','first_name', 'last_name', 'date_of_birth', 'nationality',
            'travel_document', 'document_number', 'date_of_issue', 'issuing_authority', 'issuing_country',
            'domicile_place', 'domicile_zip_code', 'domicile_street', 'domicile_country',
            'traveling_with_surname', 'traveling_with_first_name', 'traveling_with_date_of_birth',
            'total_guests', 'date_of_arrival', 'date_of_departure','created_at', 'signature'
        ]
        read_only_fields = ['created_at', 'id']
