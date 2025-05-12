import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { TYPE_SECONDARY } from '../../Button';
import Placeholder from '../../Placeholder';
import FileUpload from '../../Form/FileUpload';
import Button from '../../Button/Button';
import text, { TEXT_CENTER, TEXT_STYLE_META } from '../../_HOC/text';
import { flexContainer, FLEX_WRAP, JUSTIFY_CENTER } from '../../_HOC/flexContainer';
import initUpload from '../common/init-upload';
import { Div, Paragraph } from '../../_Wrappers';

const CenteredMetaParagraph = text({ style: TEXT_STYLE_META, align: TEXT_CENTER })(Paragraph);
const FileUploadContainer = flexContainer()(Div);

class UploadDropzone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeholderNode: null,
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
    this.onPlaceholderRef = this.onPlaceholderRef.bind(this);
    const {
      url, onUploadStart, onUploadProgress, onFileUploaded,
      onAllFilesUploaded, customDropzoneDomNode,
    } = this.props;
    this.initUpload = () => initUpload(this, {
      url,
      onUploadStart,
      onUploadProgress,
      onFileUploaded,
      onAllFilesUploaded,
      customDropzoneDomNode,
    });
  }

  componentDidUpdate() {
    if (this.state.placeholderNode && !this.state.uploadInitialized) {
      this.initUpload();
    }
  }

  componentWillUnmount() {
    this.deinit();
  }

  onPlaceholderRef(placeholderRef) {
    this.setState({ placeholderNode: placeholderRef });
  }

  deinit() {
    if (this.uploadComponent) {
      this.uploadComponent.$destroy();
      this.uploadComponent = null;
    }
  }

  render() {
    const { dropLabel, uploadButtonLabel } = this.props;

    return (
      <Placeholder onRef={this.onPlaceholderRef}>
        <CenteredMetaParagraph dangerouslySetInnerHTML={{ __html: // eslint-disable-line
          dropLabel }}
        />
        <FileUploadContainer
          flexContainer={{
            wrap: FLEX_WRAP,
            contentJustify: JUSTIFY_CENTER,
          }}
        >
          <FileUpload multipleFiles>
            <Button type={TYPE_SECONDARY}>
              {uploadButtonLabel}
            </Button>
          </FileUpload>
        </FileUploadContainer>
      </Placeholder>
    );
  }
}


UploadDropzone.propTypes = {
  url: PropTypes.string.isRequired,
  onUploadStart: PropTypes.func,
  onUploadProgress: PropTypes.func,
  onFileUploaded: PropTypes.func,
  onAllFilesUploaded: PropTypes.func,
  dropLabel: PropTypes.string,
  uploadButtonLabel: PropTypes.string,
  customDropzoneDomNode: PropTypes.instanceOf(Element),
};

UploadDropzone.defaultProps = {
  onUploadStart: UIkit.util.noop,
  onUploadProgress: UIkit.util.noop,
  onFileUploaded: UIkit.util.noop,
  onAllFilesUploaded: UIkit.util.noop,
  dropLabel: '<p>Drag your files here</p><p>or</p>',
  uploadButtonLabel: 'Choose files',
  customDropzoneDomNode: null,
};

export default UploadDropzone;
