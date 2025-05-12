import PropTypes from 'prop-types';
import { coordinates, coordinatesPropTypes } from './';

export const locationEntryPropTypes = Object.freeze({
  ...coordinatesPropTypes,
  timestamp: PropTypes.number,
});

export default Object.freeze({
  ...coordinates,
  timestamp: 0,
});
