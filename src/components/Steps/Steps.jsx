import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UIkit from 'uikit';
import { isEnter, isSpace } from '../../util/keypressEventsUtil';
import { STATUS_NOT_COMPLETED } from './model/status';
import { stepInfoPropTypes } from './model/stepInfo';
import './Steps.scss';

const Steps = (props) => {
  const { steps, onStepChanged } = props;

  function renderStep(step, styleName) {
    return (
      <li key={step.title} styleName={styleName}>
        <a
          role="button"
          tabIndex={0}
          onClick={(e) => {
            onStepChanged(step.title);
            e.preventDefault();
          }}
          onKeyPress={(e) => {
            if (isSpace(e) || isEnter(e)) {
              onStepChanged(step.title);
              e.preventDefault();
            }
          }}
        >
          {step.title}
        </a>
      </li>);
  }

  return (
    <ul className={classNames('uk-tab', props.className)}>
      { steps.map((step) => {
        let styleName = step.status === STATUS_NOT_COMPLETED ? '' : step.status;
        if (step.isCurrent) {
          styleName = 'active';
        }
        return renderStep(step, styleName);
      })}
    </ul>);
};

Steps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape(stepInfoPropTypes)).isRequired,
  onStepChanged: PropTypes.func,
  className: PropTypes.string,
};

Steps.defaultProps = {
  onStepChanged: UIkit.util.noop,
  className: null,
};

export default Steps;
