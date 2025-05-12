import { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withPropsPassthrough } from '../_HOC';

const ModalTitle = props => (
  createElement(
    props.type,
    {
      className: classNames(props.className, 'uk-modal-title'),
      ...props.passthrough(),
    },
    props.children,
  )
);

ModalTitle.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

ModalTitle.defaultProps = {
  type: 'h2',
  children: null,
  className: null,
};

export default withPropsPassthrough()(ModalTitle);
