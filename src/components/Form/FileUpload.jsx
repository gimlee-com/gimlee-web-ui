import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const FileUpload = forwardRef((props, ref) => {
  // target:true is needed for updating the file name in the closest input
  const ukFormCustomValue = props.displayFileName ? 'target: true' : '';

  return (
    <div uk-form-custom={ukFormCustomValue} ref={ref}>
      <input type="file" multiple={props.multipleFiles ? true : null} />
      {props.displayFileName && (<input
        className="uk-input uk-form-width-medium"
        type="text"
        placeholder={props.fileNamePlaceholder}
        disabled
      />)}
      {props.children}
    </div>
  );
});

FileUpload.propTypes = {
  children: PropTypes.node.isRequired,
  multipleFiles: PropTypes.bool,
  displayFileName: PropTypes.bool,
  fileNamePlaceholder: PropTypes.string,
};

FileUpload.defaultProps = {
  displayFileName: false,
  multipleFiles: false,
  fileNamePlaceholder: '',
};

export default FileUpload;
