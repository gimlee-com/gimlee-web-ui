import { STATUS_NOT_COMPLETED, STATUS_SKIPPED, STATUS_VALID, stepInfo } from 'gimlee-ui-components/Steps';
import i18n from 'gimlee-ui-service/i18n';
import { stepValid } from './stepValidators';

export default function (stepId, stepsValidation, currentStep, skippedSteps) {
  let status = STATUS_NOT_COMPLETED;
  if (skippedSteps.includes(stepId)) {
    status = STATUS_SKIPPED;
  } else if (stepValid(stepId, stepsValidation)) {
    status = STATUS_VALID;
  }

  return {
    ...stepInfo,
    id: stepId,
    title: i18n.t(`app:ads:${stepId}`),
    status,
    isCurrent: stepId === currentStep,
  };
}
