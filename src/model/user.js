import PropTypes from 'prop-types';

export const userPropTypes = {
  username: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
  operations: PropTypes.arrayOf(PropTypes.string),
};

export default {
  username: null,
  roles: [],
  operations: [],
};
