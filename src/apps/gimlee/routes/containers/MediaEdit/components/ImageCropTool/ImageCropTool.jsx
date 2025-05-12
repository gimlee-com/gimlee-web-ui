import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';

class ImageCropTool extends Component {
  constructor(props) {
    super(props);
    this.handleCropEvent = this.handleCropEvent.bind(this);

    this.imageRef = createRef();
    this.imagePreviewRef = createRef();
  }

  componentDidMount() {
    this.cropper = new Cropper(this.imageRef.current, {
      preview: this.imagePreviewRef,
      viewMode: 1,
      aspectRatio: 1,
      crop: () => {
        this.handleCropEvent();
      },
      ready: () => {
        this.handleCropEvent();
      },
      movable: false,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
    });
  }

  componentWillUnmount() {
    this.cropper.destroy();
  }

  handleCropEvent() {
    this.cropper.getCroppedCanvas().toBlob(blob =>
      this.props.onImageEdited(blob));
  }

  render() {
    const { imageUrl } = this.props;
    return (
      <div className="uk-flex uk-flex-column" style={{ maxHeight: 300 }}>
        <img src={imageUrl} alt="crop" style={{ display: 'block', maxWidth: '100%' }} ref={this.imageRef} />
        <div ref={this.imagePreviewRef} />
      </div>
    );
  }
}

ImageCropTool.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onImageEdited: PropTypes.func.isRequired,
};

export default ImageCropTool;
