import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Image = ({ passthrough, alt }) => (
  <img
    alt={alt}
    {...passthrough()}
  />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  passthrough: PropTypes.func.isRequired,
};

export default withPropsPassthrough()(Image);
