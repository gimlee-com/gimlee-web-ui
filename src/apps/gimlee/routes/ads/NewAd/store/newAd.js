import stepsState from '../model/stepsState';
import validationState from '../model/validationState';
import { STEP_AD_TYPE } from '../model/step';

const LOAD_STEP = 'new-ad/load-step';
const SKIP_STEP = 'new-ad/skip-step';
const UNSKIP_STEP = 'new-ad/unskip-step';
const RESET_STATE = 'new-ad/reset-state';
const UPDATE_AD_TYPE = 'new-ad/update-ad-type';

const newAdState = {
  stepsState: { ...stepsState },
  stepsValidation: { ...validationState },
  currentStep: null,
  skippedSteps: [],
};

const initialState = { ...newAdState };

export function initWizard() {
  return (dispatch) => {
    dispatch({
      type: RESET_STATE,
    });
  };
}

export function goToStep(step) {
  return (dispatch) => {
    dispatch({
      type: UNSKIP_STEP,
      payload: step,
    });
    dispatch({
      type: LOAD_STEP,
      payload: step,
    });
  };
}

export function skipStep(step) {
  return (dispatch) => {
    dispatch({
      type: SKIP_STEP,
      payload: step,
    });
  };
}

export function unskipStep(step) {
  return (dispatch) => {
    dispatch({
      type: UNSKIP_STEP,
      payload: step,
    });
  };
}

function updateStepState(actionType, step, state, validation) {
  return (dispatch) => {
    dispatch({
      type: actionType,
      payload: { step, state, validation },
    });
  };
}

export function updateAdType(state, validation) {
  return updateStepState(UPDATE_AD_TYPE, STEP_AD_TYPE, state, validation);
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case LOAD_STEP: {
      return {
        ...state,
        currentStep: action.payload,
      };
    }
    case UPDATE_AD_TYPE: {
      const step = action.payload.step;
      return {
        ...state,
        stepsState: {
          ...state.stepsState,
          [step]: action.payload.state,
        },
        stepsValidation: {
          ...state.stepsValidation,
          [step]: action.payload.validation || state.stepsValidation[step],
        },
      };
    }
    case SKIP_STEP:
      return {
        ...state,
        skippedSteps: [...state.skippedSteps, action.payload],
      };
    case UNSKIP_STEP: {
      const stepToBeSkipped = action.payload;
      const stepIndex = state.skippedSteps.indexOf(stepToBeSkipped);
      if (stepIndex >= 0) {
        return {
          ...state,
          skippedSteps: [
            ...state.skippedSteps.slice(0, stepIndex),
            ...state.skippedSteps.slice(stepIndex + 1),
          ],
        };
      }
      return state;
    }
    default:
      return state;
  }
}
