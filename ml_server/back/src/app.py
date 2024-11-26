from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
import mlflow
import numpy as np
from mlflow import MlflowClient
import pandas as pd
from mlflow.entities import ViewType
import joblib
import os

app = FastAPI(
    title="MLOps end-to-end project",
    description="This is a simple FastAPI application with MLFlow Client.",
    version="0.1",
    docs_url="/docs",
    redoc_url=None
)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")