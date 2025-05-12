import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const ActionLink = props => (
  <a
    className={
      classNames({
        'uk-link': props.linkStyled,
      }, props.className)}
    tabIndex="0"
    role="button"
    onClick={props.clickAction}
    {...props.passthrough()}
  >
    {props.children}
  </a>
);

ActionLink.propTypes = {
  clickAction: PropTypes.func.isRequired,
  children: PropTypes.node,
  linkStyled: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

ActionLink.defaultProps = {
  children: null,
  linkStyled: false,
  className: null,
};

export default withPropsPassthrough()(ActionLink);
