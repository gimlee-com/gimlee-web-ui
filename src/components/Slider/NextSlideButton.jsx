import React from 'react';
import PropTypes from 'prop-types';
import { withPropsPassthrough } from '../_HOC';

const NextSlideButton = props => (
  <button
    uk-slidenav-next=""
    uk-slider-item="next"
    {...props.passthrough()}
  />
);

NextSlideButton.propTypes = {
  passthrough: PropTypes.func.isRequired,
};

export default withPropsPassthrough()(NextSlideButton);
