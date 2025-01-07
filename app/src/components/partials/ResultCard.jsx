import React from "react";

export default function ResultCard({ prediction, error }) {
  return (
    <div className="result-card">
    {error && (
        <div className="error mt-4">
            {error.includes("L'instance backend est éteinte") ? (
                <>
                    <p>❌ Erreur : {error}</p>
                    <p>
                        <a href="mailto:brgakodo@gmail.com" className="email-link">
                        📧  Contactez l'administrateur pour un démo.
                        </a>
                    </p>
                </>
            ) : (
                <p>❌ Erreur : {error}</p>
            )}
        </div>
    )}

    {prediction !== null && (
        <div className="mt-4">
            {prediction === 1 ? (
                <p className="warning">
                    ⚠️ Le patient pourrait potentiellement avoir le diabète.
                </p>
            ) : (
                <p className="safe">
                    ✅ Le patient est peu susceptible d'avoir le diabète.
                </p>
            )}
        </div>
    )}
</div>
  );
}
