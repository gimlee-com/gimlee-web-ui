import PropTypes from 'prop-types';

export const validationPropTypes = {
  valid: PropTypes.bool,
  message: PropTypes.string,
  pending: PropTypes.bool,
};

export default Object.freeze({
  valid: null,
  message: null,
  pending: false,
});
