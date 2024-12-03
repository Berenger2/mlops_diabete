import React from "react";

export default function StepButtonGroup({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  disabled,
  onSubmit,
}) {
  return (
    <div className="row mt-4">
      {currentStep > 0 && (
        <div className="col-6">
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={onPrevious}
            disabled={disabled} 
          >
            Précédent
          </button>
        </div>
      )}
      {currentStep < totalSteps - 1 && (
        <div className="col-6">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={onNext}
            disabled={disabled} 
          >
            Suivant
          </button>
        </div>
      )}
      {currentStep === totalSteps - 1 && (
        <div className="col-6">
          <button type="submit" className="btn btn-success btn-block" disabled={disabled} >
            Valider
          </button>
        </div>
      )}
    </div>
  );
}
