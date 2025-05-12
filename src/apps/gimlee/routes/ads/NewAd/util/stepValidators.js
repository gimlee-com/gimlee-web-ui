import { STEP_AD_TYPE } from '../model/step';

export function adTypeStepValid(validationState) {
  return validationState.valid;
}

export function stepValid(stepId, validationState) {
  switch (stepId) {
    case STEP_AD_TYPE:
      return adTypeStepValid(validationState[stepId]);
    default:
      throw new Error(`No such step: ${stepId}`);
  }
}
