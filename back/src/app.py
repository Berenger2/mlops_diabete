from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
import numpy as np
import joblib
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Backend || Diabetes prediction plateform",
    description="This is a simple FastAPI application for Diabetes prediction plateform",
    version="0.1",
    docs_url="/docs",
    redoc_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

ML_CLIENT_URL = os.getenv("ML_CLIENT_URL")
app = FastAPI(
    title="Backend || Diabetes Prediction Platform",
    description="This is a simple FastAPI application for Diabetes prediction platform",
    version="0.1",
    docs_url="/docs",
    redoc_url=None
)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

@app.get("/predict")
def predict(
    feature1: float = Query(..., description="Pregnancies"),
    feature2: float = Query(..., description="Glucose"),
    feature3: float = Query(..., description="BloodPressure"),
    feature4: float = Query(..., description="SkinThickness"),
    feature5: float = Query(..., description="Insulin"),
    feature6: float = Query(..., description="BMI"),
    feature7: float = Query(..., description="DiabetesPedigreeFunction"),
    feature8: float = Query(..., description="Age")
):
    try:
        #production
        response = requests.get(ML_CLIENT_URL)
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Impossible de récupérer le modèle en production.")
        
        models_in_production = response.json()
        if not models_in_production:
            raise HTTPException(status_code=404, detail="Aucun modèle en production trouvé.")
        
        model_info = models_in_production[0]
        artifact_uri = model_info.get("artifact_uri")
        model_path = os.path.join(artifact_uri, "model.pkl")
        
        if not os.path.exists(model_path):
            raise HTTPException(status_code=404, detail=f"Le fichier du modèle est introuvable : {model_path}")
        
        model = joblib.load(model_path)

        #parametres
        expected_features = model.n_features_in_
        input_array = np.array([feature1, feature2, feature3, feature4,feature5,feature6,feature7,feature8])

        #missing columns
        if input_array.shape[0] < expected_features:
            missing_features = expected_features - input_array.shape[0]
            input_array = np.append(input_array, [0] * missing_features)  
        
        input_array = input_array.reshape(1, -1)

        #prediction
        prediction = model.predict(input_array)

        return {
            "prediction": prediction.tolist(),
            "model_name": model_info["model_name"],
            "model_version": model_info["version"],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la prédiction : {str(e)}")