import PropTypes from 'prop-types';
import { fetchStatus, fetchStatusPropTypes } from '../../model/api';
import user, { userPropTypes } from './user';

export const loginSessionPropTypes = {
  fetchStatus: PropTypes.shape(fetchStatusPropTypes),
  user: PropTypes.shape(userPropTypes),
  csrfToken: PropTypes.string,
  expires: PropTypes.number,
};

export default {
  fetchStatus: { ...fetchStatus },
  user: { ...user },
  csrfToken: null,
  expires: -1,
};
