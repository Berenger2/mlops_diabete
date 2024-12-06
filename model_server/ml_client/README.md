# ML Client - FastAPI

## Présentation
Le ML Client est une application FastAPI qui agit comme intermédiaire entre le Model Server (MLflow) et les autres composants. Il expose des endpoints pour récupérer les modèles et leurs artefacts.

## Fonctionnalités
- Connexion avec MLflow pour accéder aux modèles et artefacts en production.
- Endpoint `/production` pour obtenir le modèle actuellement actif.
- Préparation des artefacts pour les composants en aval.