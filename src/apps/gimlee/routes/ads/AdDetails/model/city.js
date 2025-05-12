import PropTypes from 'prop-types';

export const cityPropTypes = {
  id: PropTypes.string,
  country: PropTypes.string,
  adm1: PropTypes.string,
  adm2: PropTypes.string,
  name: PropTypes.string,
  district: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
};

export default Object.freeze({
  id: '',
  country: '',
  adm1: '',
  adm2: '',
  name: '',
  district: '',
  lat: 0,
  lon: 0,
});
