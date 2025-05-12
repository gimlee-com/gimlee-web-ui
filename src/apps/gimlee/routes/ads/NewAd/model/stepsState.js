import PropTypes from 'prop-types';
import {
  STEP_AD_TYPE,
} from './step';

export const stepsStatePropTypes = {
  [STEP_AD_TYPE]: PropTypes.string,
};

export const stepsStateDefaultProps = {
  [STEP_AD_TYPE]: '',
};

export default Object.freeze({
  [STEP_AD_TYPE]: '',
});
