async function loadPatients() {
    try {
        // load
        const response = await fetch('patients.json');
        const patients = await response.json();

        // card
        const container = document.getElementById('patients-container');
        container.innerHTML = '';

        patients.forEach(patient => {
            const patientCard = document.createElement('div');
            patientCard.className = 'patient-card';
            patientCard.innerHTML = `
                <h3>${patient.name} (${patient.gender})</h3>
                <p><strong>Pregnancies:</strong> ${patient.pregnancies}</p>
                <p><strong>Glucose:</strong> ${patient.glucose}</p>
                <p><strong>Blood Pressure:</strong> ${patient.bloodPressure}</p>
                <p><strong>Skin Thickness:</strong> ${patient.skinThickness}</p>
                <p><strong>Insulin:</strong> ${patient.insulin}</p>
                <p><strong>BMI:</strong> ${patient.bmi}</p>
                <p><strong>Diabetes Pedigree:</strong> ${patient.diabetesPedigreeFunction}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <button class="predict-button" id="predict-btn-${patient.id}">Faire une Prédiction</button>
                <div id="loader-${patient.id}" class="loader" style="display: none;"></div>
                <div id="result-${patient.id}" class="result-card" style="display: none;"></div>
                <div id="error-${patient.id}" class="error" style="display: none;"></div>
            `;
            container.appendChild(patientCard);

            // prediction
            document.getElementById(`predict-btn-${patient.id}`).addEventListener("click", async () => {
                // loader
                document.getElementById(`loader-${patient.id}`).style.display = "block";
                document.getElementById(`result-${patient.id}`).style.display = "none";
                document.getElementById(`error-${patient.id}`).style.display = "none";

                try {
                    const result = await DiabetesSDK.predict({
                        pregnancies: patient.pregnancies,
                        glucose: patient.glucose,
                        bloodPressure: patient.bloodPressure,
                        skinThickness: patient.skinThickness,
                        insulin: patient.insulin,
                        bmi: patient.bmi,
                        diabetesPedigreeFunction: patient.diabetesPedigreeFunction,
                        age: patient.age
                    });

                    // result
                    document.getElementById(`loader-${patient.id}`).style.display = "none";
                    document.getElementById(`result-${patient.id}`).style.display = "block";

                    const prediction = result.prediction[0];
                    const predictionText = prediction === 1
                        ? "⚠️ Le patient pourrait potentiellement avoir le diabète."
                        : "✅ Le patient est peu susceptible d'avoir le diabète.";

                    const resultCard = document.getElementById(`result-${patient.id}`);
                    resultCard.innerText = predictionText;
                    resultCard.className = `result-card ${prediction === 1 ? 'failure' : 'success'}`;

                } catch (error) {
                    // erreur
                    document.getElementById(`loader-${patient.id}`).style.display = "none";
                    document.getElementById(`error-${patient.id}`).style.display = "block";
                    document.getElementById(`error-${patient.id}`).innerText = `❌ Erreur : ${error.message}`;
                }
            });
        });
    } catch (error) {
        console.error("Erreur lors du chargement des patients:", error);
    }
}

window.onload = function () {
    // SDK 
    if (typeof DiabetesSDK !== 'undefined') {
        loadPatients();
    } else {
        console.error("Le SDK n'a pas pu être chargé.");
    }
};