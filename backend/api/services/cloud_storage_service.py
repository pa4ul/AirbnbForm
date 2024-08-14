import os
from googleapiclient.discovery import build
from google.oauth2 import service_account
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

SCOPES = ['https://www.googleapis.com/auth/drive']
PARENT_FOLDER_ID='1-lMG-tDLl1QiUjYDxXCMnkKUeNzQyYZ5'
SERVICE_ACCOUNT_INFO = {
    "type": "service_account",
    "project_id": os.getenv("PROJECT_ID"),
    "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    "private_key": os.getenv("PRIVATE_KEY").replace('\\n', '\n'),
    "client_email": os.getenv("CLIENT_EMAIL"),
    "client_id": os.getenv("CLIENT_ID"),
    "auth_uri": os.getenv("AUTH_URI"),
    "token_uri": os.getenv("TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL")
}

def authenticate():
    creds = service_account.Credentials.from_service_account_info(SERVICE_ACCOUNT_INFO, scopes=SCOPES)
    return creds
    
def upload_photo(file_path, last_name):
    creds =authenticate()
    service = build("drive","v3",credentials=creds)
    
    file_metadata = {
        'name': f"Gueshsheet_{last_name}",
        'parents': [PARENT_FOLDER_ID]
    }
    
    file = service.files().create(
        body=file_metadata,
        media_body=file_path
    ).execute()
    