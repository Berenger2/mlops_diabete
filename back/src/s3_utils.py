import boto3
import os
from fastapi import HTTPException
from src.logger import get_logger

logger = get_logger(__name__)

def get_s3_client():
    return boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION')
    )

def download_from_s3(s3_uri: str, local_path: str):
    try:
        bucket_name, key = s3_uri.replace("s3://", "").split("/", 1)
        s3_client = get_s3_client()
        s3_client.download_file(bucket_name, key, local_path)
        return local_path
    except s3_client.exceptions.NoSuchKey:
        raise HTTPException(status_code=404, detail=f"Fichier introuvable dans S3 : {s3_uri}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du téléchargement depuis S3 : {str(e)}")
    
# download_from_s3(s3_uri,local_path)