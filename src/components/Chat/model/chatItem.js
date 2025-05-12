import PropTypes from 'prop-types';
import moment from 'moment';

export const chatItemPropTypes = Object.freeze({
  id: PropTypes.string,
  type: PropTypes.oneOf(['MESSAGE', 'DAYS-DIVIDER']),
  author: PropTypes.shape({
    username: PropTypes.string,
    displayName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  data: PropTypes.string,
  own: PropTypes.bool,
  sending: PropTypes.bool,
  timestamp: PropTypes.instanceOf(moment),
  lastEdited: PropTypes.instanceOf(moment),
  height: PropTypes.number,
});

export default Object.freeze({
  id: null,
  type: 'MESSAGE',
  author: null,
  data: null,
  own: false,
  sending: false,
  timestamp: null,
  lastEdited: null,
  height: 0,
});
