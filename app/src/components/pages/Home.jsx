import React, { memo, useState } from 'react';
import InputField from '../partials/InputField';
import axios from 'axios';


export default memo(function Home() {
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        pregnancies: "",
        glucose: "",
        bloodPressure: "",
        skinThickness: "",
        insulin: "",
        bmi: "",
        diabetesPedigreeFunction: "",
        age: ""
    });

    const steps = [
        [
            { name: "pregnancies", type: "text", placeholder: "Nombre de grossesses" },
            { name: "glucose", type: "text", placeholder: "Concentration de glucose" },
            { name: "bloodPressure", type: "text", placeholder: "Pression artérielle" },
            { name: "skinThickness", type: "text", placeholder: "Épaisseur du pli cutané" }
        ],
        [
            { name: "insulin", type: "text", placeholder: "Niveau d'insuline sérique" },
            { name: "bmi", type: "text", placeholder: "Indice de masse corporelle" },
            { name: "diabetesPedigreeFunction", type: "text", placeholder: "Indice de prédisposition familiale" },
            { name: "age", type: "text", placeholder: "Âge" }
        ]
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value !== "" ? value : "",
        });
    };


    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                feature1: formData.pregnancies,
                feature2: formData.glucose,
                feature3: formData.bloodPressure,
                feature4: formData.skinThickness,
                feature5: formData.insulin,
                feature6: formData.bmi,
                feature7: formData.diabetesPedigreeFunction,
                feature8: formData.age,
            });

            const response = await axios.post(`http://127.0.0.1:5050/predict?${queryParams.toString()}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Réponse du backend :', response.data);
            alert(`Prédiction reçue : ${response.data.prediction}`);
        } catch (error) {
            console.error('Erreur lors de la soumission :', error.response?.data || error.message);
            alert('Une erreur est survenue lors de la soumission.');
        }
    };


    return (
        <div>
            <div className="forny-container">
                <div className="forny-inner">
                    <div className="forny-two-pane">
                        <div>
                            <div className="forny-form">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active bg-transparent">
                                            <span>Prédiction du diabète</span>
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane fade show active" role="tabpanel">
                                        <p className="mt-6 mb-6">Renseigner les données du patient en suivant les étapes successives.</p>
                                        <form onSubmit={handleSubmit}>
                                            {steps[currentStep].map((field, index) => (
                                                <InputField
                                                    key={`${currentStep}-${field.name}`}
                                                    name={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                />
                                            ))}

                                            <div className="row mt-4">
                                                {currentStep > 0 && (
                                                    <div className="col-6">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary btn-block"
                                                            onClick={handlePrevious}
                                                        >
                                                            Précédent
                                                        </button>
                                                    </div>
                                                )}
                                                {currentStep < steps.length - 1 && (
                                                    <div className="col-6">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-block"
                                                            onClick={handleNext}
                                                        >
                                                            Suivant
                                                        </button>
                                                    </div>
                                                )}
                                                {currentStep === steps.length - 1 && (
                                                    <div className="col-6">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-success btn-block"
                                                        >
                                                            Valider
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
});
