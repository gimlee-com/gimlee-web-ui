import React from 'react';
import PropTypes from 'prop-types';
import { withPropsPassthrough } from '../_HOC';

const PreviousSlideButton = props => (
  <button
    uk-slidenav-previous=""
    uk-slider-item="previous"
    {...props.passthrough()}
  />
);

PreviousSlideButton.propTypes = {
  passthrough: PropTypes.func.isRequired,
};

export default withPropsPassthrough()(PreviousSlideButton);
