import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import LoadingIndicator from '../LoadingIndicator';
import Overlay from '../Overlay';
import background, { BG_COLOR_DEFAULT } from '../_HOC/background';
import position, { PLACEMENT_CENTER, PLACEMENT_COVER } from '../_HOC/position';
import styles from './PageContent.scss';

const LoadingOverlay = compose(
  background({ color: BG_COLOR_DEFAULT }),
  position({ placement: PLACEMENT_COVER }),
)(Overlay);
const LoadingContent = position({ placement: PLACEMENT_CENTER })(Overlay);

const renderLoadingOverlay = loadingMessage => (<LoadingOverlay>
  <LoadingContent>
    <div className="uk-inline uk-text-center uk-width-1-1"><LoadingIndicator /></div>
    { loadingMessage && <p>{loadingMessage}</p> }
  </LoadingContent>
</LoadingOverlay>);

const PageContent = (
  {
    children, isLoading, loadingMessage, className,
    loadingClassName, containerVariants, contentVariants,
  },
) => (
  <motion.div
    className={styles.container}
    initial="initial"
    animate="enter"
    exit="exit"
    variants={containerVariants}
  >
    {isLoading && (
    <motion.div
      className={classNames(styles.container, styles['loading-overlay'], loadingClassName)}
      key="loading-overlay"
      variants={contentVariants}
    >
      {renderLoadingOverlay(loadingMessage)}
    </motion.div>
    )}
    {!isLoading &&
    <motion.div
      key="content"
      className={className}
      variants={contentVariants}
    >
      {children}
    </motion.div>
  }
  </motion.div>
  );

PageContent.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  className: PropTypes.string,
  loadingClassName: PropTypes.string,
  containerVariants: PropTypes.object, // eslint-disable-line
  contentVariants: PropTypes.object, // eslint-disable-line
};

PageContent.defaultProps = {
  children: null,
  isLoading: false,
  loadingMessage: null,
  className: null,
  loadingClassName: null,
  containerVariants: null,
  contentItemVariants: null,
};

export default PageContent;
