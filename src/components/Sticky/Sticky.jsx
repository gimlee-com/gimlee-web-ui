import React, { PureComponent, forwardRef } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { withPropsPassthrough } from '../_HOC';

class Sticky extends PureComponent {
  constructor(props) {
    super(props);
    this.processRef = this.processRef.bind(this);
  }

  processRef(elem) {
    const {
      top, bottom, offset, animation, clsActive, clsInactive,
      widthElement, showOnUp, media, targetOffset,
    } = this.props;
    UIkit.sticky(elem, {
      top,
      bottom,
      offset,
      animation,
      'cls-active': clsActive,
      'cls-inactive': clsInactive,
      'width-element': widthElement,
      'show-on-up': showOnUp,
      media,
      'target-offset': targetOffset,
    });
    if (this.props.onRef) {
      this.props.onRef(elem);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={this.processRef}
        {...this.props.passthrough()}
      >
        {children}
      </div>
    );
  }
}

Sticky.propTypes = {
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  offset: PropTypes.number,
  animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  clsActive: PropTypes.string,
  clsInactive: PropTypes.string,
  widthElement: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showOnUp: PropTypes.bool,
  media: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  targetOffset: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onRef: PropTypes.func,
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

Sticky.defaultProps = {
  top: 0,
  bottom: false,
  offset: 0,
  animation: false,
  clsActive: 'uk-active',
  clsInactive: '',
  widthElement: false,
  showOnUp: false,
  media: false,
  targetOffset: false,
  children: null,
  onRef: UIkit.util.noop,
};

const StickyWithPassthrough = withPropsPassthrough()(Sticky);

export default forwardRef((props, ref) => <StickyWithPassthrough onRef={ref} {...props} />);
