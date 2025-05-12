import PropTypes from 'prop-types';
import error, { errorPropTypes } from './error';

export const fetchStatusPropTypes = {
  fetching: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.shape(errorPropTypes),
};


export default {
  fetching: false,
  loaded: false,
  error: { ...error },
};
