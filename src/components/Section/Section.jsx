import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Section = (props) => {
  let className = 'uk-section';
  if (props.type) {
    className = classNames(className, `uk-section-${props.type}`);
  }

  return (
    <section
      id={props.id}
      className={classNames(className, props.className)}
      {...props.passthrough()}
    >
      {props.children}
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary', 'muted', null]),
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Section.defaultProps = {
  id: null,
  type: null,
  children: null,
  className: null,
};

export default withPropsPassthrough()(Section);
