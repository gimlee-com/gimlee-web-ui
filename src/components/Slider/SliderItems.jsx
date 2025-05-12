import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withPropsPassthrough } from '../_HOC';

class SliderItems extends PureComponent {
  render() {
    return (
      <ul
        className={classnames('uk-slider-items', this.props.className)}
        {...this.props.passthrough()}
      >
        {this.props.children}
      </ul>
    );
  }
}

SliderItems.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

SliderItems.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(SliderItems);
