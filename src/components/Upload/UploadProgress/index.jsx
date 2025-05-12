import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './UploadProgress.scss';

const UploadProgress = props => (
  <progress
    className={classNames('uk-progress', styles.progress)}
    value={props.value}
    max={props.max}
    hidden={!props.visible}
  />
);

UploadProgress.propTypes = {
  visible: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    visible: state.uploadProgress.pending,
    value: state.uploadProgress.currentFile - (1 - state.uploadProgress.currentFileProgress),
    max: state.uploadProgress.filesCount,
  };
}

export default connect(mapStateToProps)(UploadProgress);
