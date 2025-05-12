import PropTypes from 'prop-types';

export const rangePropTypes = {
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string]),
};

export default {
  from: null,
  to: null,
};
