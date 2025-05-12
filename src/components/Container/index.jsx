import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Container = props => (
  <div
    ref={props.onRef}
    id={props.id}
    className={classNames('uk-container', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

Container.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Container.defaultProps = {
  id: null,
  children: null,
  className: null,
  onRef: null,
};

const ContainerWithPropsPassthrough = (withPropsPassthrough()(Container));

export default React.forwardRef(
  (props, ref) => <ContainerWithPropsPassthrough onRef={ref} {...props} />);
