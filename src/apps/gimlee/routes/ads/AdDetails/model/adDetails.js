import PropTypes from 'prop-types';

export const cityDetailsPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  district: PropTypes.string,
  adm1: PropTypes.string.isRequired,
  adm2: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export const locationWithCityDetailsPropTypes = {
  city: PropTypes.shape(cityDetailsPropTypes),
  point: PropTypes.arrayOf(PropTypes.number),
};

export const adDetailsPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.shape(locationWithCityDetailsPropTypes),
  price: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
  }),
  mediaPaths: PropTypes.arrayOf(PropTypes.string),
  mainPhotoPath: PropTypes.string,
};

export default Object.freeze({
  id: '',
  title: '',
  description: null,
  location: {
    city: {
      id: '',
      name: '',
      district: null,
      adm1: '',
      adm2: '',
      country: '',
    },
    point: [],
  },
  price: {
    amount: null,
    currency: null,
  },
  mediaPaths: [],
  mainPhotoPath: null,
});
