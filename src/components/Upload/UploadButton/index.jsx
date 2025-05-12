import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import FileUpload from '../../Form/FileUpload';
import initUpload from '../common/init-upload';
import Button from '../../Button/Button';

class UploadButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progressBar: {
        hidden: true,
        max: '100',
        value: '0',
      },
      currentUpload: {
        filesCount: 0,
        filesCompleted: 0,
        responses: [],
      },
      uploadInitialized: false,
    };
    this.uploadRef = React.createRef();
    const { url, onUploadStart, onUploadProgress, onFileUploaded, onAllFilesUploaded } = this.props;
    this.initUpload = uploadRef => initUpload(this, {
      url, onUploadStart, onUploadProgress, onFileUploaded, onAllFilesUploaded,
    }, uploadRef);

    this.uploadComponent = null;
  }

  componentDidMount() {
    if (this.uploadRef.current) {
      this.initUpload(this.uploadRef.current);
    }
  }

  componentDidUpdate() {
    if (this.uploadRef.current && !this.state.uploadInitialized) {
      this.initUpload(this.uploadRef.current);
    }
  }

  componentWillUnmount() {
    this.deinit();
  }

  deinit() {
    if (this.uploadComponent) {
      this.uploadComponent.$destroy();
      this.uploadComponent = null;
    }
  }

  render() {
    const { children, className, multipleFiles } = this.props;

    return (
      <FileUpload multipleFiles={multipleFiles} ref={this.uploadRef}>
        <Button className={className}>
          {children}
        </Button>
      </FileUpload>
    );
  }
}


UploadButton.propTypes = {
  url: PropTypes.string.isRequired,
  onUploadStart: PropTypes.func,
  onUploadProgress: PropTypes.func,
  onFileUploaded: PropTypes.func,
  onAllFilesUploaded: PropTypes.func,
  multipleFiles: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

UploadButton.defaultProps = {
  onUploadStart: UIkit.util.noop,
  onUploadProgress: UIkit.util.noop,
  onFileUploaded: UIkit.util.noop,
  onAllFilesUploaded: UIkit.util.noop,
  multipleFiles: true,
  className: '',
  children: null,
};

export default UploadButton;
