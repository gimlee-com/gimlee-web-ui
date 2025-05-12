import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Image = ({ srcset, alt, passthrough }) => (
  <img
    uk-img=""
    data-srcset={srcset}
    alt={alt}
    {...passthrough()}
  />
  );

Image.propTypes = {
  srcset: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  alt: PropTypes.string.isRequired,
  passthrough: PropTypes.func.isRequired,
};

export default withPropsPassthrough()(Image);
