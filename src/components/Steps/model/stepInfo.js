import PropTypes from 'prop-types';
import { STATUS_NOT_COMPLETED, STATUS_INVALID, STATUS_SKIPPED, STATUS_VALID } from './status';

export const stepInfoPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  status: PropTypes.oneOf(
    [STATUS_NOT_COMPLETED, STATUS_VALID, STATUS_SKIPPED, STATUS_INVALID],
  ).isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export const stepInfoDefaultProps = {
  title: '',
};

export default {
  id: '',
  title: '',
  status: STATUS_NOT_COMPLETED,
  isCurrent: false,
};
