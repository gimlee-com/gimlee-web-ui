import PropTypes from 'prop-types';
import moment from 'moment';

export const messagePropTypes = Object.freeze({
  id: PropTypes.string,
  author: PropTypes.string,
  data: PropTypes.string,
  own: PropTypes.bool,
  sending: PropTypes.bool,
  timestamp: PropTypes.instanceOf(moment),
  lastEdited: PropTypes.instanceOf(moment),
});

export default Object.freeze({
  id: null,
  author: null,
  data: null,
  own: false,
  sending: false,
  timestamp: null,
  lastEdited: null,
});
