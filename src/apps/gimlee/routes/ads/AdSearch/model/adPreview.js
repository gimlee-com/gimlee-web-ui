import PropTypes from 'prop-types';

export const adPreviewPropTypes = Object.freeze({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  distance: PropTypes.number,
  price: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
  }),
  mainPhotoPath: PropTypes.string,
  location: PropTypes.shape({
    city: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      district: PropTypes.string,
      adm1: PropTypes.string.isRequired,
      adm2: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
});

export default Object.freeze({
  id: '',
  title: '',
  description: null,
  distance: 0,
  price: {
    amount: null,
    currency: null,
  },
  mainPhotoPath: null,
  location: Object.freeze({
    city: Object.freeze({
      id: '',
      name: '',
      district: '',
      adm1: '',
      adm2: '',
      country: '',
    }),
  }),
});
