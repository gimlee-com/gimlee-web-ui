import PropTypes from 'prop-types';

export const adPreviewPropTypes = Object.freeze({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  distance: PropTypes.number,
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
});

export default Object.freeze({
  id: '',
  name: '',
  description: null,
  distance: 0,
  city: Object.freeze({
    id: '',
    name: '',
    district: '',
    country: '',
  }),
});
