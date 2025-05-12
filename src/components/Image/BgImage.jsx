import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const BgImage = ({ src, passthrough }) => (
  <div
    uk-img=""
    data-src={src}
    {...passthrough()}
  />
  );

BgImage.propTypes = {
  src: PropTypes.string.isRequired,
  passthrough: PropTypes.func.isRequired,
};

export default withPropsPassthrough()(BgImage);
