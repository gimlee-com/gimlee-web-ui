import React from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { withPropsPassthrough } from 'gimlee-ui-components/_HOC';
import { ActionButton, TYPE_TEXT } from 'gimlee-ui-components/Button';

const Suggestion = props => (
  <div
    className={props.className}
    {...props.passthrough()}
  >
    <ActionButton
      type={TYPE_TEXT}
      className="uk-width-1-1 uk-flex uk-flex-left uk-flex-column"
      action={props.onClick}
    >
      {props.children}
    </ActionButton>
  </div>
);

Suggestion.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Suggestion.defaultProps = {
  onClick: UIkit.util.noop(),
  className: null,
};

export default withPropsPassthrough()(Suggestion);
