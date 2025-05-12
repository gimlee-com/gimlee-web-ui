import PropTypes from 'prop-types';
import validation, { validationPropTypes } from 'gimlee-ui-model/forms/validation';
import {
  STEP_AD_TYPE,
} from '../model/step';

export const validationStatePropTypes = {
  [STEP_AD_TYPE]: PropTypes.shape(validationPropTypes).isRequired,
};

export default Object.freeze({
  [STEP_AD_TYPE]: { ...validation },
});
