import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import animations from '../constant/animations';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const MODE_CLICK = 'click';
export const MODE_HOVER = 'hover';

const Dropdown = forwardRef((props, ref) => (
  <div
    ref={ref}
    uk-dropdown={`
      mode: ${props.mode};
      pos: ${props.position};
      toggle: ${props.toggleElementSelector};
      delay-show: ${props.delayShow};
      delay-hide: ${props.delayHide};
      boundary: ${props.boundaryElementSelector};
      boundary-align: ${props.boundaryAlign};
      flip: ${props.flip};
      offset: ${props.offset};
      animation: ${props.animation};
      duration: ${props.duration}`
    }
    {...props.passthrough()}
  >
    {props.children}
  </div>),
);

Dropdown.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf([MODE_CLICK, MODE_HOVER]),
  position: PropTypes.oneOf([
    'bottom',
    'bottom-left',
    'bottom-right',
    'top',
    'top-left',
    'top-right',
    'left',
    'right',
    'bottom-justify',
  ]),
  toggleElementSelector: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  boundaryElementSelector: PropTypes.string,
  boundaryAlign: PropTypes.bool,
  delayShow: PropTypes.number,
  delayHide: PropTypes.number,
  flip: PropTypes.oneOf([true, false, 'x', 'y']),
  offset: PropTypes.number,
  animation: PropTypes.oneOf([false].concat(Object.values(animations))),
  duration: PropTypes.number,
  passthrough: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  children: null,
  mode: MODE_HOVER,
  position: 'bottom-left',
  toggleElementSelector: '- *',
  boundaryElementSelector: 'body',
  boundaryAlign: false,
  delayShow: 0,
  delayHide: 800,
  flip: true,
  offset: 0,
  animation: false,
  duration: 200,

};

export default withPropsPassthrough()(Dropdown);
