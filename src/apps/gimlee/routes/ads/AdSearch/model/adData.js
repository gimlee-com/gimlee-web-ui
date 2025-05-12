import PropTypes from 'prop-types';
import adPreview from './adPreview';

export const adDataPropTypes = {
  content: PropTypes.arrayOf(PropTypes.shape(adPreview)),
  first: PropTypes.bool,
  last: PropTypes.bool,
  empty: PropTypes.bool,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  number: PropTypes.number,
  size: PropTypes.number,
  numberOfElements: PropTypes.number,
};

export default Object.freeze({
  content: [],
  first: true,
  last: true,
  empty: true,
  totalPages: 1,
  totalElements: 0,
  number: 0,
  size: 0,
  numberOfElements: 0,
});
