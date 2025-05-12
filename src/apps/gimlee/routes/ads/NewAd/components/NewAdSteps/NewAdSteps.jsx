import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid, GUTTER_SMALL } from 'gimlee-ui-components/Grid';
import { stepInfoPropTypes } from './model/stepInfo';
import styles from './NewAdSteps.scss';

const NewAdSteps = (props) => {
  const { steps, t } = props;

  function renderStep(step) {
    const className = classNames(
      styles[step.status],
      { [styles.active]: step.isCurrent },
    );
    return (
      <motion.div
        key={step.title}
        className={classNames(className, styles.step)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <span className={styles.stepDot} />
      </motion.div>
    );
  }

  return (
    <div className={classNames(props.className, 'uk-flex uk-flex-column uk-margin-remove')}>
      <Grid gutter={GUTTER_SMALL} className={styles.stepDotsContainer}>
        <AnimatePresence>
          { steps.map(step => renderStep(step))}
        </AnimatePresence>
      </Grid>
      <AnimatePresence>
        { steps.map((step, index) => (
        step.isCurrent &&
        <motion.small
          initial={{ translateX: 50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: -50, opacity: 0 }}
          key={`label-${step.title}`}
          className={styles.currentStepLabel}
        >
          {`${t('app:ads:step').toUpperCase()} ${index + 1}: ${step.title}`}
        </motion.small>
      ))}
      </AnimatePresence>
    </div>
  );
};

NewAdSteps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape(stepInfoPropTypes)).isRequired,
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

NewAdSteps.defaultProps = {
  className: null,
};

export default translate()(NewAdSteps);
