import React, { createRef, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import offset from 'document-offset';
import { fetchStatus } from 'gimlee-ui-model/api';
import { boxBlurCanvasRGBA } from 'lib/canvasBlur';
import styles from './ImageBlurTool.scss';

class ImageBlurTool extends PureComponent {
  constructor(props) {
    super(props);
    this.initImage = this.initImage.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.state = {
      imageFetchStatus: { ...fetchStatus, fetching: true },
      image: {
        src: '',
        width: -1,
        height: -1,
      },
    };

    this.canvasRef = createRef();
    this.temporaryCanvasRef = createRef();

    this.isMouseDown = false;
  }

  componentDidMount() {
    this.initImage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.image.src !== this.state.image.src) {
      this.updateCanvas(this.state.image);
    }
    if (prevProps.imageUrl !== this.props.imageUrl) {
      this.initImage();
    }
  }

  componentWillUnmount() {
    const canvasRef = this.canvasRef.current;
    if (canvasRef) {
      this.canvasRef.current.removeEventListener('onmousedown', this.handleMouseDown);
      this.canvasRef.current.removeEventListener('onmousemove', this.handleMouseMove);
      this.canvasRef.current.removeEventListener('onmouseup', this.handleMouseUp);
      this.canvasRef.current.removeEventListener('onmouseout', this.handleMouseOut);
    }
  }

  initImage() {
    this.setState({
      imageFetchStatus: { ...fetchStatus, fetching: true },
    });
    const img = new Image();
    img.src = this.props.imageUrl;
    img.onload = () => {
      this.setState({
        imageFetchStatus: { ...fetchStatus, loaded: true },
        image: img,
      });
    };
  }

  updateCanvas(img) {
    const canvas = this.canvasRef.current;
    const tempCanvas = this.temporaryCanvasRef.current;

    canvas.width = img.width;
    [canvas, tempCanvas].forEach((c) => {
      c.width = img.width;
      c.height = img.height;
    });

    canvas.getContext('2d').drawImage(img, 0, 0);
    this.img = img;
    this.img.src = canvas.toDataURL('image/jpeg');
    canvas.toBlob((blob) => {
      this.props.onImageEdited(blob);
    });
  }

  handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    const tempCanvas = this.temporaryCanvasRef.current;
    tempCanvas
      .getContext('2d')
      .clearRect(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height,
      );
    this.isMouseDown = true;
  }

  handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isMouseDown = false;

    const tempCanvas = this.temporaryCanvasRef.current;
    const tempCanvasContext = tempCanvas.getContext('2d');

    const canvas = this.canvasRef.current;
    const canvasContext = canvas.getContext('2d');

    const sizeMultiplier = this.state.image.width / canvas.getBoundingClientRect().width;

    tempCanvasContext.save();
    tempCanvasContext.globalCompositeOperation = 'source-in';
    tempCanvasContext.drawImage(this.img, 0, 0);
    tempCanvasContext.restore();
    boxBlurCanvasRGBA('tempCanvas', 0, 0, tempCanvas.width, tempCanvas.height, 11 * sizeMultiplier, 1);
    canvasContext.save();
    canvasContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    canvasContext.drawImage(tempCanvas, 0, 0);
    canvasContext.globalCompositeOperation = 'destination-over';
    canvasContext.drawImage(this.img, 0, 0);
    canvasContext.restore();

    this.img.src = canvas.toDataURL('image/jpeg');
    canvas.toBlob((blob) => {
      this.props.onImageEdited(blob);
    });
  }

  handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isMouseDown = false;
  }

  handleMouseMove(e) {
    if (!this.isMouseDown) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const canvas = this.canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    const tempCanvas = this.temporaryCanvasRef.current;
    const tempCanvasContext = tempCanvas.getContext('2d');

    const canvasOffset = offset(canvas);
    const sizeMultiplier = this.state.image.width / canvas.getBoundingClientRect().width;
    const mouseX = (e.clientX - canvasOffset.left) * sizeMultiplier;
    const mouseY =
      ((e.clientY - canvasOffset.top)
      + document.documentElement.scrollTop)
      * sizeMultiplier;
    canvasContext.beginPath();
    canvasContext.arc(mouseX, mouseY, 20 * sizeMultiplier, 0, Math.PI * 2);
    canvasContext.closePath();
    canvasContext.fill();
    tempCanvasContext.beginPath();
    tempCanvasContext.arc(mouseX, mouseY, 20 * sizeMultiplier, 0, Math.PI * 2);
    tempCanvasContext.closePath();
    tempCanvasContext.fill();
  }

  render() {
    return (
      <div className="uk-position-relative uk-width-medium uk-width-large@m uk-align-center">
        {
          this.state.imageFetchStatus.loaded &&
            <Fragment>
              <canvas ref={(ref) => {
                this.canvasRef.current = ref;
                if (ref) {
                  ref.addEventListener('mousedown', this.handleMouseDown);
                  ref.addEventListener('mousemove', this.handleMouseMove);
                  ref.addEventListener('mouseup', this.handleMouseUp);
                  ref.addEventListener('mouseout', this.handleMouseOut);
                }
              }}
              />
              <canvas id="tempCanvas" className={styles.tempCanvas} ref={this.temporaryCanvasRef} />
            </Fragment>
        }
      </div>
    );
  }
}

ImageBlurTool.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onImageEdited: PropTypes.func.isRequired,
};

export default ImageBlurTool;
