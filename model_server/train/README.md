# Model Server - MLflow

## Présentation
Le Model Server est basé sur **MLflow** et gère le cycle de vie des modèles de machine learning, y compris l'enregistrement, le suivi et la gestion des versions. Il est intégré à **Google Cloud Storage** pour les artefacts et à **Google Cloud SQL** pour le stockage des métadonnées.

## Fonctionnalités
- Enregistrement des modèles et suivi des métriques d'entraînement.
- Hébergement des artefacts sur Google Cloud Storage.
- Stockage des métadonnées des modèles dans une base PostgreSQL sur Google Cloud SQL.
