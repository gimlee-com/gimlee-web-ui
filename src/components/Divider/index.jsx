import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Divider = props => (
  <hr
    ref={props.onRef}
    id={props.id}
    className={classNames('uk-divider', props.className)}
    {...props.passthrough()}
  />
);

Divider.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Divider.defaultProps = {
  id: null,
  className: null,
  onRef: null,
};

const DividerWithPropsPassthrough = (withPropsPassthrough()(Divider));

export default React.forwardRef(
  (props, ref) => <DividerWithPropsPassthrough onRef={ref} {...props} />);
