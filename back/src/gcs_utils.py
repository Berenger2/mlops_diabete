from google.cloud import storage
import os
from fastapi import HTTPException
from src.logger import get_logger

from dotenv import load_dotenv

load_dotenv()

logger = get_logger(__name__)

storage_access_key = os.getenv("STORAGE_ACCESS_KEY")  

def get_gcs_client():
    try:
        return storage.Client.from_service_account_json(storage_access_key)
    except Exception as e:
        logger.error(f"Erreur lors de la création du client GCS : {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création du client GCS")

def download_from_gcs(gcs_uri: str, local_path: str):
    try:
        bucket_name, blob_name = gcs_uri.replace("gs://", "").split("/", 1)
        gcs_client = get_gcs_client()
        bucket = gcs_client.bucket(bucket_name)
        blob = bucket.blob(blob_name)
  
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        blob.download_to_filename(local_path)
        return local_path
    except HTTPException as http_ex:
        logger.error(f"Erreur HTTP : {http_ex.detail}")
        raise
    except Exception as e:
        logger.error(f"Erreur inattendue lors du téléchargement : {e}")
        raise HTTPException(status_code=500, detail=f"Erreur lors du téléchargement depuis GCS : {str(e)}")

