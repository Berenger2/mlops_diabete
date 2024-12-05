import React from 'react'
import { Link } from 'react-router-dom'

export default function CrmUrl() {
    return (
        <div class="mt-10 mb-4 text-center crm-card">
            <div class="d-block text-center mb-2">
                Testez l'intégration du modèle par SDK
            </div>
            <Link to="https://diabetecrm.netlify.app" target="_blank" type="button" class="active btn btn-info">Projet Exemple</Link>
        </div>
    )
}
