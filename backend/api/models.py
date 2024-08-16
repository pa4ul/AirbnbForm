import os
import uuid
import base64
from io import BytesIO

from django.db import models
from PIL import Image as PilImage
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Image as PlatypusImage
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

from .services.cloud_storage_service import upload_photo

PDF_DIR = "pdfs"
SIGNATURE_SCALE_FACTOR = 0.7

class Guestsheet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Guest personal information
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=255)

    # Travel document information
    travel_document = models.CharField(max_length=255)
    document_number = models.CharField(max_length=255)
    date_of_issue = models.DateField()
    issuing_authority = models.CharField(max_length=255)
    issuing_country = models.CharField(max_length=255)
    
    # Main domicile information
    domicile_place = models.CharField(max_length=255)
    domicile_zip_code = models.CharField(max_length=20)
    domicile_street = models.CharField(max_length=255)
    domicile_country = models.CharField(max_length=255)
    
    # Traveling with
    traveling_with_surname = models.CharField(max_length=255, blank=True, null=True)
    traveling_with_first_name = models.CharField(max_length=255, blank=True, null=True)
    traveling_with_date_of_birth = models.DateField(blank=True, null=True)
    
    # Guest stay information
    total_guests = models.IntegerField()
    date_of_arrival = models.DateField()
    date_of_departure = models.DateField()
    actual_departure = models.DateField(blank=True, null=True)
    
    # Signature
    signature = models.TextField(blank=True, null=True)  # Signature as Base64 string

    # Other
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.last_name} {self.first_name} from {self.nationality}"
    
    @staticmethod
    def base64_to_image(base64_str):
        """Convert a Base64-encoded string to a Pillow Image object."""
        try:
            base64_str = base64_str.split(',')[1]
            image_data = base64.b64decode(base64_str)
            return PilImage.open(BytesIO(image_data))
        except Exception as e:
            print(f"Error converting base64 to image: {e}")
            return None

    def generate_pdf(self):
        if not os.path.exists(PDF_DIR):
            os.makedirs(PDF_DIR)

        file_name = f"Guestsheet_{self.id}.pdf"
        file_path = os.path.join(PDF_DIR, file_name)

        doc = SimpleDocTemplate(file_path, pagesize=letter)
        styles = getSampleStyleSheet()
        
        title_style = ParagraphStyle(name='Title', fontSize=16, spaceAfter=12, alignment=1, fontName="Helvetica-Bold")
        heading_style = ParagraphStyle(name='Heading', fontSize=14, spaceAfter=8, fontName="Helvetica-Bold")
        normal_style = ParagraphStyle(name='Normal', fontSize=12, fontName="Helvetica")
        
        content = []
        content.append(Paragraph("Guest Information", title_style))

        data = [
            ['Field', 'Value'],
            ['First Name', self.first_name],
            ['Last Name', self.last_name],
            ['Date of Birth', self.date_of_birth],
            ['Nationality', self.nationality],
            ['Document Number', self.document_number],
            ['Date of Issue', self.date_of_issue],
            ['Issuing Authority', self.issuing_authority],
            ['Issuing Country', self.issuing_country],
            ['Domicile Place', self.domicile_place],
            ['Domicile Zip Code', self.domicile_zip_code],
            ['Domicile Street', self.domicile_street],
            ['Domicile Country', self.domicile_country],
            ['Traveling with Surname', self.traveling_with_surname or 'N/A'],
            ['Traveling with First Name', self.traveling_with_first_name or 'N/A'],
            ['Traveling with Date of Birth', self.traveling_with_date_of_birth or 'N/A'],
            ['Total Guests', self.total_guests],
            ['Date of Arrival', self.date_of_arrival],
            ['Date of Departure', self.date_of_departure],
            ['Actual Departure', self.actual_departure or 'N/A'],
            ['Created At', self.created_at]
        ]

        if self.signature:
            image = self.base64_to_image(self.signature)
            if image:
                new_size = tuple(int(dim * SIGNATURE_SCALE_FACTOR) for dim in image.size)
                resized_image = image.resize(new_size, PilImage.Resampling.LANCZOS)
                signature_img = BytesIO()
                resized_image.save(signature_img, format="PNG")
                signature_img.seek(0)
                signature_img = PlatypusImage(signature_img, width=new_size[0], height=new_size[1])
                data.append(['Signature', signature_img])

        table = Table(data, colWidths=[2*inch, 4*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), HexColor('#d3d3d3')),
            ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#000000')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('GRID', (0, 0), (-1, -1), 1, HexColor('#000000')),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ]))
        content.append(table)
        doc.build(content)

        return file_path
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save object to database first
        new_file = self.generate_pdf()  # Then create PDF file
        upload_photo(new_file, self.last_name)
