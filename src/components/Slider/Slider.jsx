import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { withPropsPassthrough } from '../_HOC';

class Slider extends PureComponent {

  constructor() {
    super();
    this.initSlider = this.initSlider.bind(this);

    this.ref = createRef();
  }

  componentDidMount() {
    this.initSlider();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      UIkit.slider(this.ref.current).show(this.props.index);
    }
  }

  initSlider() {
    const {
      autoplay, autoplayInterval, center, draggable, easing,
      finite, index, pauseOnHover, sets, velocity,
    } = this.props;

    UIkit.slider(this.ref.current, {
      autoplay,
      autoplayInterval,
      center,
      draggable,
      easing,
      finite,
      index,
      pauseOnHover,
      sets,
      velocity,
    });
  }

  render() {
    return (
      <div
        ref={this.ref}
        {...this.props.passthrough()}
      >
        {this.props.children}
      </div>
    );
  }
}

Slider.propTypes = {
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  center: PropTypes.bool,
  draggable: PropTypes.bool,
  easing: PropTypes.string,
  finite: PropTypes.bool,
  index: PropTypes.number,
  pauseOnHover: PropTypes.bool,
  sets: PropTypes.bool,
  velocity: PropTypes.number,
  passthrough: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  children: null,
  autoplay: false,
  autoplayInterval: 7000,
  center: false,
  draggable: true,
  easing: 'ease',
  finite: false,
  index: 0,
  pauseOnHover: true,
  sets: false,
  velocity: 1,
};

export default withPropsPassthrough()(Slider);
