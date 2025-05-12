import PropTypes from 'prop-types';

export const sortingPropTypes = {
  by: PropTypes.oneOf(['CREATED_DATE']),
  direction: PropTypes.oneOf(['DESC', 'ASC']),
};

export default Object.freeze({
  by: 'CREATED_DATE',
  direction: 'DESC',
});
