import React, { memo, useState } from "react";
import InputField from "../partials/InputField";
import axios from "axios";
import { predictServerUrl } from "../../api";
import ResultCard from "../partials/ResultCard";
import StepButtonGroup from "../partials/StepButtonGroup";
import Loader from "../partials/Loader";
import { Link } from "react-router-dom";
import CrmUrl from "../partials/CrmUrl";

export default memo(function Home() {
    const [currentStep, setCurrentStep] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        pregnancies: "",
        glucose: "",
        bloodPressure: "",
        skinThickness: "",
        insulin: "",
        bmi: "",
        diabetesPedigreeFunction: "",
        age: "",
    });

    const steps = [
        [
            { name: "pregnancies", type: "text", placeholder: "Nombre de grossesses" },
            { name: "glucose", type: "text", placeholder: "Concentration de glucose" },
            { name: "bloodPressure", type: "text", placeholder: "Pression artérielle" },
            { name: "skinThickness", type: "text", placeholder: "Épaisseur du pli cutané" },
        ],
        [
            { name: "insulin", type: "text", placeholder: "Niveau d'insuline sérique" },
            { name: "bmi", type: "text", placeholder: "Indice de masse corporelle" },
            { name: "diabetesPedigreeFunction", type: "text", placeholder: "Indice de prédisposition familiale" },
            { name: "age", type: "text", placeholder: "Âge" },
        ],
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
        setError(null);
        setLoading(true);
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

            const response = await axios.post(`${predictServerUrl}/predict?${queryParams.toString()}`, null, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setPrediction(response.data.prediction[0]);
            setError(null);
        } catch (err) {
            setError("Une erreur est survenue lors de la soumission.");
            setPrediction(null);
        } finally {
            setLoading(false);
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
                                        <Link className="nav-link active bg-transparent" to="">
                                            <span>Prédiction du diabète</span>
                                        </Link>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane fade show active" role="tabpanel">
                                        <p className="mt-6 mb-6">
                                            Renseignez les données du patient en suivant les étapes successives.
                                        </p>
                                        <form onSubmit={handleSubmit}>
                                            {steps[currentStep].map((field) => (
                                                <InputField
                                                    key={`${currentStep}-${field.name}`}
                                                    name={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                />
                                            ))}

                                            <StepButtonGroup
                                                currentStep={currentStep}
                                                totalSteps={steps.length}
                                                onPrevious={handlePrevious}
                                                onNext={handleNext}
                                                disabled={loading}
                                            />
                                            <CrmUrl/>
                                        </form>
                                        {loading && <Loader />}
                                        {!loading && <ResultCard prediction={prediction} error={error} />}
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