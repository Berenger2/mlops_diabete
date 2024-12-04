(function (global) {
    const DiabetesSDK = {
        // backend docker image(azure)
        apiUrl: "https://mldiabeteback-e6cnahdve0aghhca.canadacentral-01.azurewebsites.net",

        // validation
        validateData(data) {
            const requiredFields = [
                "pregnancies", "glucose", "bloodPressure", "skinThickness",
                "insulin", "bmi", "diabetesPedigreeFunction", "age"
            ];

            const errors = [];
            for (const field of requiredFields) {
                if (data[field] === undefined || data[field] === null) {
                    errors.push(`Le champ "${field}" est requis.`);
                } else if (typeof data[field] !== "number") {
                    errors.push(`Le champ "${field}" doit être un nombre (float).`);
                }
            }

            if (errors.length > 0) {
                throw new Error(errors.join("\n"));
            }
        },

        // prediction
        async predict(data) {
            this.validateData(data);

            const queryParams = new URLSearchParams({
                feature1: data.pregnancies,
                feature2: data.glucose,
                feature3: data.bloodPressure,
                feature4: data.skinThickness,
                feature5: data.insulin,
                feature6: data.bmi,
                feature7: data.diabetesPedigreeFunction,
                feature8: data.age,
            });

            const response = await fetch(`${this.apiUrl}/predict?${queryParams.toString()}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Erreur API : ${JSON.stringify(errorDetails)}`);
            }

            return await response.json();
        }
    };
    global.DiabetesSDK = DiabetesSDK;
})(window);
